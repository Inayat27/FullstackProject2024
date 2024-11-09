import { model } from "mongoose";
import { CreationGroupSchema, GroupCreationType } from "../db/Group";
import { GroupMessageSchema, GroupMessageType } from "../db/Messages";

export const GroupsModel = model<GroupCreationType>(
  "Groups",
  CreationGroupSchema
);
export const GroupMessagesModel = model<GroupMessageType>(
  "GroupsMessagees",
  GroupMessageSchema
);
