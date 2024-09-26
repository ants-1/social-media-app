import { useEffect, useState } from "react";
import useAuth from "./useAuth";

export function useFetchAllComments(postId) {
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState(null);
  const { isAuth } = useAuth();

  const fetchComments = async () => {
    setError(null);
    setComments(null);
    console.log(comments);

    if (isAuth && postId) {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}/comments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setComments(null);
          setError(data.error);
        } else {
          setComments(data);
        }
      } catch (error) {
        setError(`Failed to fetch comments: ${error}`);
      }
    }
  };

  useEffect(() => {
      fetchComments();
  }, [postId]);

  return { comments, error };
}
