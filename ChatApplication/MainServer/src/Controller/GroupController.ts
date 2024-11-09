import mongoose from "mongoose";
import { GroupsModel } from "../models";
import { addMemberPayloadType, CreateGroupType } from "../types";
import { Request, Response } from "express";

export const getAllGroups = async (req: Request, res: Response) => {
  try {
    const groups = await GroupsModel.find();
    res.status(200).json(groups);
  } catch (e) {
    res.status(500).json({
      message: "Error fetching groups",
      error: (e as Error).message, // Type assertion for error message
    });
  }
};

export const getGroup = async (req: Request, res: Response) => {
  const groupId = req.params.id;

  try {
    const isPresent = await GroupsModel.findById(groupId);
    if (isPresent) {
      res
        .json({
          Message: "Group details found Succeccfully!",
          GroupDetails: isPresent,
        })
        .status(200);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error updating Group detail :-${groupId}`,
      error: (error as Error).message,
    });
  }
};

/// Group Creation controller
export const CreateGroup = async (req: Request, res: Response) => {
  const CreateGroupPayload = req.body;
  // Validate payload
  const parsedPayload = CreateGroupType.safeParse(CreateGroupPayload);
  if (!parsedPayload.success) {
    res.status(400).json({
      message: "Invalid input!",
    });
    return;
  }
  //  Creating group
  try {
    const isCreated = await GroupsModel.create({
      GroupId: new mongoose.Types.ObjectId(),
      CreatedByUserID: parsedPayload.data.CreatedByUserID,
      GroupName: parsedPayload.data.GroupName,
    });

    if (isCreated) {
      res.json({
        GroupId: isCreated._id,
        status: 200,
        message: "Operation successful",
      });
    }
  } catch (error: any) {
    console.log("Error Occured :- ", error.message);
  }
};

export const addMembers = async (req: Request, res: Response) => {
  const memberPayload = req.body;

  // Validate payload
  const parsedPayload = addMemberPayloadType.safeParse(memberPayload);
  if (!parsedPayload.success) {
    res.status(400).json({
      message: "Invalid input!",
    });
    return;
  }

  try {
    const { groupId, member } = parsedPayload.data;

    // Find the group by ID and add members
    const existingGroup = await GroupsModel.findByIdAndUpdate(groupId, {
      $addToSet: { Members: { $each: member } },
    });

    if (!existingGroup) {
      res.status(404).json({ message: "Group not found" });
      return;
    }

    res.status(200).json({
      message: "Members added successfully",
      GroupId: groupId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding members to the group",
      error: (error as Error).message,
    });
  }
};

// deleting group
export const deleteGroup = async (req: Request, res: Response) => {
  const groupId = req.params.id;
  try {
    const isDeleted = await GroupsModel.deleteOne({ _id: groupId });
    if (isDeleted) {
      res
        .json({
          Message: "Group Deleted Succeccfully!",
        })
        .status(200);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error deleting group :-${groupId}`,
      error: (error as Error).message,
    });
  }
};

// updating Group info
export const updateGroupName = async (req: Request, res: Response) => {
  const groupId = req.params.id;
  const { GroupName } = req.body;

  try {
    const isUpdated = await GroupsModel.findByIdAndUpdate(groupId, {
      GroupName: GroupName,
    });
    if (isUpdated) {
      res
        .json({
          Message: "Group details updated Succeccfully!",
          GroupId: isUpdated._id,
        })
        .status(200);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error updating Group detail :-${groupId}`,
      error: (error as Error).message,
    });
  }
};

// removing member from the group

export const removeMember = async (req: Request, res: Response) => {
  const groupId = req.params.id;
  const { member } = req.body;

  try {
    const isExists = await await GroupsModel.findById(groupId);
    if (isExists && isExists.Members.length > 0) {
      await GroupsModel.findById(groupId, {
        $pull: { Members: member },
      });
      res
        .json({
          Message: "Member removed Successfully!",
          GroupId: isExists._id,
        })
        .status(200);
    } else {
      res
        .json({
          Message: "No Member present!",
          GroupId: isExists?._id,
        })
        .sendStatus(404);
    }
  } catch (error) {
    res.status(500).json({
      message: `Error Removing the Member :-${groupId}`,
      error: (error as Error).message,
    });
  }
};
