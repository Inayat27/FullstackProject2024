import express, { Router } from "express";
import {
  getAllGroups,
  getGroup,
  addMembers,
  CreateGroup,
  deleteGroup,
  updateGroupName,
  removeMember,
} from "../Controller";

import {clerkMiddleware } from "@clerk/express";

const router: Router = express.Router();
router.use(clerkMiddleware());
//Create groups
router.post("/create-group", CreateGroup);

// Fetch all groups
router.get("/group", getAllGroups);
router.get("/group/:id", getGroup);

// Add members to a group
router.post("/addMember", addMembers);

//remove Member
router.delete("/delete-group/:id", deleteGroup);

// upudate groupName

router.put("/group/:id", updateGroupName);

// removing Member from group
router.delete("/delete-member/:id", removeMember);

export default router;
