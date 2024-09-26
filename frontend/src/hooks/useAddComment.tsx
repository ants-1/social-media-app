import { useState } from "react";
import useAuth from "./useAuth";

interface NewComment {
  author: string;
  text: string;
}

interface CommentResponse {
  id: string;
  text: string;
  postId: string;
  authorId: string;
  timestamp: string;
}

export default function useAddComment() {
  const [error, setError] = useState<string | null>(null);
  const { isAuth, user } = useAuth();

  const createComment = async (newComment: NewComment, postId: string): Promise<CommentResponse | null> => {
    setError(null);

    if (!isAuth || !user) {
      setError("You must be authenticated to create a comment.");
      return null;
    }

    if (!postId) {
      setError("Invalid post ID.");
      return null;
    }

    try {
      const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newComment, authorId: user._id }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to create comment.");
        return null;
      }

      const data: CommentResponse = await response.json();
      return data;
    } catch (error) {
      setError(`Failed to create new comment: ${error}`);
      return null;
    }
  };

  return { error, createComment };
}
