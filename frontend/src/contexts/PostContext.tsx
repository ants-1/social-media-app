import { createContext, useContext, useState, ReactNode } from "react";
import { PostType } from "@/types/PostType";
import { useFetchAllPosts } from "@/hooks/useFetchAllPosts";

interface PostContextType {
  posts: PostType[] | null;
  post: PostType | null;
  getPost: (postId: string) => PostType | null;
  setPost: (post: PostType | null) => void;
  error: string | null;
}

export const PostContext = createContext<PostContextType>({
  posts: null,
  post: null,
  getPost: () => null,
  setPost: () => {},
  error: null,
});

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const { posts, error } = useFetchAllPosts();
  const [post, setPost] = useState<PostType | null>(null);

  const getPost = (postId: string): PostType | null => {
    const foundPost = posts?.find((post) => post._id === postId) || null;
    setPost(foundPost);
    return foundPost;
  };

  return (
    <PostContext.Provider value={{ posts, post, getPost, setPost, error }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePost = () => {
  return useContext(PostContext);
};
