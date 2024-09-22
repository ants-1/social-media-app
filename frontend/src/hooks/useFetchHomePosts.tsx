import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { PostType } from "@/types/PostType";

export function useFetchHomePosts() {
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const { isAuth, user } = useAuth(); 

  const fetchPosts = async () => {
    setError(null);

    if (isAuth && user?._id) {
      try {
        const response = await fetch(`http://localhost:3000/posts/users/${user._id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(`Error: ${data.message || "Failed to fetch posts"}`);
          setPosts(null);
        } else {
          setPosts(data); 
        }
      } catch (error) {
        setError(`Failed to fetch posts: ${error}`);
      }
    }
  };

  useEffect(() => {
      fetchPosts();
  }); 

  const refreshPosts = () => {
    fetchPosts();
  };
  
  return { posts, setPosts, error, refreshPosts };
}
