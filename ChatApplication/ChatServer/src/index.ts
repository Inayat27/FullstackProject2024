import express from "express";
import { parse, Url } from "url";
import bodyParser from "body-parser";
import cors from "cors";
import { run } from "./db";
import { WebSocketServer, WebSocket } from "ws";
import { clients } from "./utils/globalClient";
import { sendMessageToGroupMembers, sendMessageToUser } from "./helper";
import {
  GroupMembersMessagePayload,
  MessagePayload,
} from "./types/MessageInput";

import { createClient } from "redis";
const { clerkMiddleware } = require("@clerk/express");
import { ErrorHandler, NotFound } from "./MIddlewares/Error_Handling";

/// Initialize Redis client once for the entire server
const redisClient = createClient();
redisClient.on("error", (err) => console.log("Redis Client Error", err));

(async () => {
  await redisClient.connect();
  console.log("Connected to Redis successfully");
})();

const app = express();
const corsConfig = { origin: "http://localhost:5173" };
const httpServer = app.listen(8080, () => {
  console.log("WebSocket server is running on ws://localhost:8080");
});

app.use(clerkMiddleware());
app.use(bodyParser.json());
app.use(cors(corsConfig));

// Connect to the database
run();
// Routes and Error Handling Middlewares
app.use(NotFound);
app.use(ErrorHandler);

const wss = new WebSocketServer({ server: httpServer });
// WebSocket connection handler
wss.on("connection", async (ws: WebSocket, req) => {
  let userId: string;
  console.log("New WebSocket connection");
  const url = parse(req.url || "", true);
  userId = url.query.userId as string;
  
  let isAuthenticated;
  isAuthenticated = await connect(url, ws);

  // Handle incoming messages
  ws.on("message", async (data) => {
    let message = data.toString();
    try {
      let parsedMessage = JSON.parse(message);
      console.log(parsedMessage);
      if (isAuthenticated) {
        switch (parsedMessage.type) {
          case "private_message":
            handlePrivateMessage(parsedMessage, ws);
            break;
          case "group_message":
            handleGroupMessage(parsedMessage, ws);
            break;
          case "typing":
            handleTypingEvent(parsedMessage);
            break;
          default:
            ws.send("Unknown message type.");
        }
      }
    } catch (error) {
      console.error("Invalid message format:", error);
      ws.send("Invalid message format.");
      ws.close();
    }
  });

  // Handle user disconnection
  ws.on("close", async () => {
    if (userId) {
      await safeRedisCommand(async () => {
        const onlineUsers = await redisClient.lRange("OnlineUsers", 0, -1);

        for (const user of onlineUsers) {
          const parsedUser = JSON.parse(user);
          if (parsedUser.userId === userId) {
            await redisClient.lRem("OnlineUsers", 1, user);
            await redisClient.hDel("userConnections", userId);
            console.log(`User ${userId} disconnected`);
            break;
          }
        }
      });
      delete clients[userId];
    }
    console.log(`Connection closed for user ${userId || "unknown"}`);
  });
});



// redis checking
async function safeRedisCommand(command: () => Promise<any>) {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
    return await command();
  } catch (error) {
    console.error("Redis command failed:", error);
  }
}

process.on("SIGINT", async () => {
  await redisClient.quit();
  console.log("Redis client disconnected");
  process.exit(0);
});

// connection logic

async function connect(url: any, ws: any) {
  if (url.query.connect) {
    const userId = url.query.userId;
    console.log(userId);

    // If no userId is provided, close the connection
    if (!userId) {
      console.log("No user ID provided. Closing connection.");
      ws.close();
      return;
    }
    clients[userId] = ws;

    // Store user info in Redis
    await safeRedisCommand(() =>
      redisClient.hSet(
        "userConnections",
        userId,
        JSON.stringify({ connected: true })
      )
    );
    await safeRedisCommand(() =>
      redisClient.lPush("OnlineUsers", JSON.stringify({ userId }))
    );
    console.log("User authenticated with ID:", userId);
    // ws.send(JSON.stringify({ message: `Welcome, user ${userId}` }));
  } else {
    console.log("Unauthorized message received. Closing connection.");
    ws.close();
  }
  return true;
}



// Helper function to handle private messages
export function handlePrivateMessage(parsedPayload: any, ws: WebSocket) {
  let parsedPayloadMessage = MessagePayload.safeParse(parsedPayload);
  if (parsedPayloadMessage.success) {
    const { from, to, content } = parsedPayloadMessage.data;
    sendMessageToUser(from, to, content);
    // handlePrivateMessage(parsedPayloadMessage.data, ws);
  } else {
    ws.send("Invalid private message payload.");
  }
}

// Helper function to handle group messages
export function handleGroupMessage(GroupPayload: any, ws: WebSocket) {
  let parsedGroupPayload = GroupMembersMessagePayload.safeParse(GroupPayload);
  switch (parsedGroupPayload.data?.type) {
    case "group_message":
      sendMessageToGroupMembers(
        parsedGroupPayload.data?.CreatedByUserID,
        parsedGroupPayload.data?.toGroupId as any,
        parsedGroupPayload.data?.messageContent
      );
      break;
    default:
      ws.send("Unknown group message type");
  }
}

// Helper function to handle typing events
export function handleTypingEvent(typingPayload: any) {
  const { from, to, isTyping } = typingPayload;
  const recipientSocket = clients[to];
  if (recipientSocket) {
    recipientSocket.send(
      JSON.stringify({
        type: "typing",
        from,
        isTyping,
      })
    );
  }
}