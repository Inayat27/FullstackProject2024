import z  from 'zod';


export const addMemberPayloadType =z.object({
    groupId:z.string(),
    member :z.array(z.string()).optional()
});



export const CreateGroupType =z.object({
    CreatedByUserID:z.number(),
    GroupName:z.string(),
    member :z.array(z.string()).optional()
});



