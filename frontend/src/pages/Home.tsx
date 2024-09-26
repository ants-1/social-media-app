import CollapsibleSidebar from "@/components/CollapsibleSidebar"
import Header from "@/components/Header"
import { PostForm } from "@/components/PostForm"
import PostCard from "@/components/PostCard"
import Sidebar from "@/components/Sidebar"
import { useFetchHomePosts } from "@/hooks/useFetchHomePosts"
import useAuth from "@/hooks/useAuth"
import ReactLoading from "react-loading";

export default function Home() {
  const { user } = useAuth();
  const { posts, error } = useFetchHomePosts();

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!user) {
    return <ReactLoading type={"spin"} color="#000" />;
  }

  return (
    <div className="flex">
      <CollapsibleSidebar />
      <div className="flex flex-col w-full">
        <Header title="Home" />
        <div className="flex items-center justify-center h-60 py-6  border-b">
          <PostForm />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-full border-b py-10">
          {posts ? (
            posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <p>No posts available</p>
            )
          ) : (
            <ReactLoading type={"spin"} color="#000" />
          )}

        </div>
      </div>
      <Sidebar />
    </div>
  )
}