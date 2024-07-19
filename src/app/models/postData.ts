import { Like } from "./like";
import { Message } from "./message";
import { User } from "./user";

export interface Post{
    id:string;
    name?:string;
    description?:string;
    images?:string[];
    video?:string;
    likes?:Like[];
    liked?:boolean;    
    user:User;  
    created_at:Date; 
    messages:Message[];
    read_comments: boolean;
}