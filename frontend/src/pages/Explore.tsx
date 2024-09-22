import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { useFetchAllPosts } from "@/hooks/useFetchAllPosts";

export default function Explore() {
  const { posts, error } = useFetchAllPosts();

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      <CollapsibleSidebar />

      <div className="flex flex-col w-full">
        <Header title="Explore" />
        <div className="flex flex-col items-center gap-4 h-full border-b py-10">
          {posts ? (
            posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))
            ) : (
              <p>No posts available</p>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
