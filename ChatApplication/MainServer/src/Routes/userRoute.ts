import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import { requireAuth, clerkMiddleware, clerkClient } from "@clerk/express";
import { UserModel } from "../models/UserModel";
import { UserCreationType } from "../types";

const router = express.Router();

router.get(
  "/recents",
  clerkMiddleware(),
  async (req: Request, res: Response) => {
    try {
      const clerkResponse = await fetch("https://api.clerk.com/v1/users", {
        headers: {
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      });

      const groups = await fetch("http://localhost:3000/api/v1/group");
      const data = await clerkResponse.json();
      const data2 = await groups.json();
      res.json({
        data,
        data2,
      });
    } catch (error) {
      res.status(500).send("Error fetching data from Clerk");
    }
  }
);

router.get(
  "/users/:userId",
  clerkMiddleware(),
  async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
      if (userId.slice(0, 4) === "user") {
        const clerkResponse = await fetch(
          `https://api.clerk.com/v1/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
          }
        );
        const data = await clerkResponse.json();
        let isPresent = await UserModel.findOne({id:data.id})
        if(!isPresent){

          try {
            const CreatedUser = await UserModel.create({
              id: data.id,
              username:data.username,
              first_name:data.first_name,
              last_name: data.last_name,
              email_address: data.email_addresses[0].email_address
            });
            
          } catch (error) {
            console.log(error);
          }
        }
        res.json(data);
      } else {
        const groups = await fetch(
          `http://localhost:3000/api/v1/group/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
            },
          }
        );
        const data = await groups.json();
        res.json(data);
      }
    } catch (error) {
      res.status(500).send("Error fetching data from Clerk");
    }
  }
);


export default router;





