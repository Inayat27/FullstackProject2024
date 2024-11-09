import z  from 'zod';



export const MessagePayload = z.object({
    type :z.string(),
    from:z.string(),
    to:z.string(),
    content :z.string()

});

export const GroupmessagePayload =z.object({
    type :z.string(),
    CreatedByUserID:z.string(),
    GroupName :z.string(),
    member :z.array(z.string()).optional()
});



export const GroupMembersMessagePayload = z.object({
    type :z.string(),
    CreatedByUserID:z.number(),
    toGroupId:z.string(),
    messageContent :z.string()
})