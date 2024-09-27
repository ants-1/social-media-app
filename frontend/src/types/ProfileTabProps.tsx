import { PostType } from "@/types/PostType";
import { CommentType } from "@/types/CommentType";
import { AuthorType } from "@/types/AuthorType";

export interface ProfileTabProps {
  posts: PostType[];
  comments: CommentType[];
  friends: AuthorType[];
  friendRequests: AuthorType[];
}