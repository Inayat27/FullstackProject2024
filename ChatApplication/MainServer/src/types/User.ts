import { Date } from "mongoose";

export interface UserCreationType{
    id: string,
    username: string,
first_name: string,
last_name: string,
updated_at:Date,
created_at:Date,
email_address:string
}