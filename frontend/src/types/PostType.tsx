import { AuthorType } from "./AuthorType";

export interface PostType {
    _id: string;
    author: AuthorType;
    content: string;
    imgUrl?: string; 
    likes: number;
    likedBy: string[];
    dislikes: number;
    comments: string[]; 
    timestamp: string;
  }