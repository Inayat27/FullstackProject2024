import mongoose, { model } from "mongoose";
import { UserCreationType } from "../types";
import { UserSchema } from "../db/Users";


export const UserModel =mongoose.model<UserCreationType>('Users', UserSchema);

