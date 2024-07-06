import { Like } from "./like";

export interface Post{
    id?:number;
    name?:string;
    description?:string;
    image?:string;
    likes?:Like[];
    liked?:boolean;    
}