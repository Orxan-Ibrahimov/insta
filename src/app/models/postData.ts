import { Like } from "./like";
import { User } from "./user";

export interface Post{
    id:string;
    name?:string;
    description?:string;
    image?:string;
    likes?:Like[];
    liked?:boolean;    
    user:User;    
}