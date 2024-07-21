import { Comment } from "./comment";
import { Like } from "./like";
import { User } from "./user";


export interface Post{
    id:string;
    description?:string;
    images?:string[];
    video?:string;
    likes?:Like[];
    liked?:boolean;    
    user:User;  
    created_at:Date; 
    comments:Comment[];
    read_comments: boolean;
}