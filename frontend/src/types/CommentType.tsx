import { AuthorType } from "@/types/AuthorType"

export interface CommentType {
  _id: string;
  author: AuthorType;
  text: string;
  timestamp: string;
}