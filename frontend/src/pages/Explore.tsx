import CollapsibleSidebar from "@/components/CollapsibleSidebar";
import Header from "@/components/Header";
import PostCard from "@/components/PostCard";
import Sidebar from "@/components/Sidebar";
import { useTheme } from "@/components/ThemeProvider";
import { useFetchAllPosts } from "@/hooks/useFetchAllPosts";
import ReactLoading from "react-loading";

export default function Explore() {
  const { posts, error } = useFetchAllPosts();
  const { theme } = useTheme();

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
            <ReactLoading type={"spin"} color={`${theme === "dark" ? "#fff" : "#000"}`} />
          )}
        </div>
      </div>
      <Sidebar />
    </div>
  );
}
