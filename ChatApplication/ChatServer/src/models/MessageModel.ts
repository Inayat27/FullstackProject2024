import { model } from "mongoose";
import { GroupMessageSchema, GroupMessageType, MessageSchema,MessageType } from "../db/Messages";



export const MessagesModel = model<MessageType>('Messages',MessageSchema);
export const GroupMessagesModel = model<GroupMessageType>('GroupMessages',GroupMessageSchema);