import * as mongoose from 'mongoose';
export const UserModel = new mongoose.Schema({
    username: {type: String, required:true},
    password: {type: String, required: true},
    role: {type: String, required:true},
});

export interface User extends mongoose.Document{
    id:string;
    usename:string;
    password:string;
    role:string;
 //Hello
}