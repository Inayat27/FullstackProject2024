import { model } from "mongoose";
import { CreationGroupSchema, GroupCreationType } from "../db/Group";

export const GroupsModel = model<GroupCreationType>(
  "Groups",
  CreationGroupSchema
);
