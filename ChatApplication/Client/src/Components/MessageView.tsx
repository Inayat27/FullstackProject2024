import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import ChatBubble from "./chatBubble";

type MessageType = {
  user: string;
  id: string | null | undefined;
  time: string;
  content: string;
  profile:string;
  isUser: boolean;
};

const MessageView = () => {
  const user = useParams();
  const receiverId = user.id;
  const { isSignedIn, userId, isLoaded } = useAuth();
  const [message, setMessage] = useState({
    type: "private_message",
    from: userId?.toString(),
    to: receiverId?.toString(),
    content: "",
  });


  const [chatMessages, setChatMessages] = useState<MessageType[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [senderData, setsenderData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn && isLoaded && userId) {

      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/users/${userId}`);
          const data = await response.json();
          setsenderData(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUserData();
      // Ensure no connection is opened if already connected
      if (socket) {
        socket.close(); // Close any previous connection if it exists
      }

      const newSocket = new WebSocket(
        `ws://localhost:8080?userId=${userId}&connect=true`
      );

      newSocket.onopen = () => {
        console.log("WebSocket connection established");
      };

      newSocket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        console.log("From value received:", receivedMessage.from); // Debug log
        console.log("From value received:", userData); // Debug log
        setChatMessages((prevMessages) => [
          ...prevMessages,
          {
            id: receivedMessage.from || "Unknown", 
            time: new Date().toLocaleTimeString(),
            content: receivedMessage.content,
            user: `${userData?.first_name} ${userData?.last_name}`,
            profile: `${userData?.profile_image_url}`,
            isUser: receivedMessage.from === userId,
          },
        ]);
      };


      newSocket.onclose = () => {
        console.log("WebSocket connection closed");
      };

      setSocket(newSocket); // Store the new socket reference
      

      return () => {
        newSocket.close(); // Cleanup on component unmount or when userId changes
      };
    }
  }, [userId, isSignedIn, isLoaded]);



  useEffect(() => {
    if (receiverId) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/users/${receiverId}`);
          const data = await response.json();
          setUserData(data);
        } catch (err) {
          setError(err.message);
        }
      };
      fetchUserData();
    }
  }, [receiverId,userData])


  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (socket && socket.readyState === WebSocket.OPEN && message.content.trim()) {
      // Update the `from` field with `userId` right before sending
      const updatedMessage = { ...message, from: userId?.toString() };

      socket.send(JSON.stringify(updatedMessage));
      console.log("Message sent:", updatedMessage);

      // Append the message to the chat with updated fields
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          id: userId,
          time: new Date().toLocaleTimeString(),
          content: updatedMessage.content,
          user: `${senderData?.first_name} ${senderData?.last_name}`,
          profile: `${senderData?.profile_image_url}`,
          isUser: true,
        },
      ]);

      // Clear the content in `message` but keep `from` and `to`
      setMessage({ ...message, content: "" });
    } else {
      console.log("WebSocket is not open or message is empty");
    }
  };


  return (
    <div className="flex flex-col h-full">
      <div className="h-[60px] flex items-center gap-1 px-1 border border-gray-200 sticky top-0 bg-white">
        <div className="h-24 flex items-center px-2">
          <img
            alt="profile"
            src={userData?.profile_image_url}
            className="border h-10 w-10 rounded-full"
          />
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-1">
            {receiverId?.startsWith("user") ? (
              <h1 className="font-bold text-sm">
                {userData?.first_name} {userData?.last_name}
              </h1>
            ) : (
              <h1 className="font-bold text-sm">
                {userData?.GroupDetails?.GroupName}
              </h1>
            )}
            <span className="text-gray-400">
              <svg width="8px" height="8px" fill="#1d9a4d" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="5" />
              </svg>
            </span>
          </div>
          <div>
            <h1 className="text-xs font-bold text-[#f37c49] ">Online</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-visible custom-scrollbar">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className={`flex mb-3 ${msg.isUser ? 'justify-end' : 'justify-start'}`}
          >
            {/* <div className={`max-w-md rounded-2xl p-3 ${msg.isUser ? ' rounded-bl-xl rounded-tl-xl rounded-b-xl flex-row-reverse ' : 'rounded-s-xl rounded-se-xl  rounded-es-xl'}`}> */}
            <div className={`max-w-md rounded-2xl p-3 ${msg.isUser ? ' text-right ' : 'rounded-s-xl rounded-se-xl  rounded-es-xl'}`}>
              {/* <p className="text-xs text-gray-500">{msg.time}</p>
              <p className="text-sm font-semibold">{msg.user}</p>
              <p className="mt-1 text-base">{msg.content}</p> */}
            <ChatBubble time={msg.time} sender={msg.isUser} content={msg.content} user={msg.user} profile={msg.profile}/>
            </div>
          </div>
        ))}
      </div>

      <div className="h-16 border-t border-gray-200">
        <form onSubmit={sendMessage} className="flex items-center p-2">
          <input
            type="text"
            placeholder="Type Your Message here"
            className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#fde7d7] focus:outline-none focus:border-[#fde7d7]"
            value={message.content}
            onChange={(e) => setMessage({ ...message, content: e.target.value })}
          />
          <button
            type="submit"
            className="hover:bg-[#fde7d7]  focus:ring-4 focus:outline-none  font-medium rounded-xl text-sm px-2 py-2 "
          >
            <img src="../../attachment.svg" alt="Attach" />
          </button>
          <button
            type="submit"
            onClick={sendMessage}
            className="hover:bg-[#fde7d7]  focus:ring-4 focus:outline-none font-medium rounded-xl text-sm px-2 py-2 "
          >
            <img src="../../send.svg" alt="send" />
          </button>

        </form>
      </div>
    </div>
  );
};

export default MessageView;
