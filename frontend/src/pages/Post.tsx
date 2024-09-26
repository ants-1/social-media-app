import { useEffect } from "react";
import { useParams } from "react-router-dom";
import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import CommentCard from "@/components/CommentCard";
import { CommentForm } from "@/components/CommentForm";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "@/components/ThemeProvider";
import { usePost } from "@/contexts/PostContext";
import PostCard from "@/components/PostCard";
import ReactLoading from "react-loading";
import { useFetchAllComments } from "@/hooks/useFetchAllComments";

export default function Post() {
  const { theme } = useTheme();
  const { postId } = useParams<{ postId: string }>();
  const { getPost, post, error } = usePost();
  const { comments } = useFetchAllComments(postId);

  useEffect(() => {
    if (postId) {
      getPost(postId);
    }
  }, [postId, getPost]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!post) {
    return <ReactLoading type={"spin"} color="#000" />;
  }

  return (
    <div className="flex">
      <CollapsibleSidebar />
      <div className="flex flex-col w-full">
        <div className={`flex items-center justify-center py-6  border-b ${theme === 'dark' ? 'bg-orange-400' : 'bg-orange-200'}`}>
          <PostCard post={post} />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-full  border-b py-10">
          <div className="flex flex-col items-center justify-center w-full -pt-10 pb-10 border-b">
            <CommentForm />
          </div>
          <h2 className="text-xl font-semibold py-5">Comments</h2>
          {comments ? (
            comments.length > 0 ? (
              comments.map((comment) => (
                <CommentCard key={comment._id} comment={comment} />
              ))
            ) : (
              <p>No comments available</p>
            )
          ) : (
            <ReactLoading type={"spin"} color="#000" />
          )
          }
        </div>
      </div>
      <Sidebar />
    </div>
  )
}