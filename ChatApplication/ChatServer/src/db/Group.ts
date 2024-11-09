import mongoose from 'mongoose';


export interface GroupCreationType{
    GroupId: {type:mongoose.Schema.Types.ObjectId , default:mongoose.Schema.Types.ObjectId}
    CreatedByUserID :number,
    GroupName :string,
    Members :number []
}


export const CreationGroupSchema= new mongoose.Schema<GroupCreationType>({
    GroupId: {type:mongoose.Schema.Types.ObjectId , default:mongoose.Schema.Types.ObjectId},
    CreatedByUserID : {type: Number ,required:true},
   GroupName :{type:String,required:true},
   Members :{type:[Number]}
})





