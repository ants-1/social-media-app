import { useState } from "react";
import useAuth from "./useAuth";
import { PostType } from "@/types/PostType";

export default function useAddPost() {
  const [error, setError] = useState<string | null>(null);
  const { isAuth, token, user } = useAuth();

  const createPost = async (newPost: Partial<PostType>) => {
    setError(null);

    if (isAuth && token && user) {
      try {
        const response = await fetch(`http://localhost:3000/posts/users/${user._id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(newPost)
        });

        const data = await response.json();

        if (!response.ok) {
          setError(data.error);
        } else {
          return data;
        }
      } catch (error) {
        setError(`Failed to create new post: ${error}`);
      }
    }
  }

  return { error, createPost };
}