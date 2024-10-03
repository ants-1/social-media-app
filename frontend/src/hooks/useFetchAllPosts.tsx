import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { PostType } from "@/types/PostType";

export function useFetchAllPosts() {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const { isAuth } = useAuth();

  const fetchPosts = async () => {
    setError(null);

    if (isAuth) {
      try {
        const response = await fetch('http://localhost:3000/posts',
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setPosts(null);
          setError(data.error);
        } else {
          const sortedPosts = data.sort(
            (a: { timestamp: string }, b: { timestamp: string }) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );

          setPosts(sortedPosts);
        }
      } catch (error) {
        setError(`Failed to fetch posts: ${error}`);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
  });

  const refreshPost = async () => {
    fetchPosts();
  }

  return { posts, setPosts, refreshPost, error };
};