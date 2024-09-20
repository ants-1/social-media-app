import CollapsibleSidebar from "@/components/CollapsibleSidebar"
import Header from "@/components/Header"
import { PostForm } from "@/components/PostForm"
// import PostCard from "@/components/PostCard"
import Sidebar from "@/components/Sidebar"

export default function Home() {
  return (
    <div className="flex">
      <CollapsibleSidebar />
      <div className="flex flex-col w-full">
        <Header title="Home" />
        <div className="flex items-center justify-center h-60 py-6  border-b">
          <PostForm />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-full border-b py-10">
          {/* <PostCard />
          <PostCard />
          <PostCard />
          <PostCard /> */}
        </div>
      </div>
      <Sidebar />
    </div>
  )
}