import mongoose from 'mongoose';
import { UserCreationType } from '../types/User';

export const UserSchema = new mongoose.Schema<UserCreationType>({
    id:{type:String,required:true},
    username:{type:String|| null},
    first_name:{type:String},
    last_name:{type:String},
    updated_at:{ type: Date,default:Date.now ,required:false},
    created_at:{ type: Date, default: Date.now,required:false },
    email_address:{type:String,required:true},
    
})
