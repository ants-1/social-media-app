import CollapsibleSidebar from "@/components/CollapsibleSidebar"
import Header from "@/components/Header"
import PostCard from "@/components/PostCard"
import Sidebar from "@/components/Sidebar"

export default function Explore() {
    return (
        <div className="flex">
        <CollapsibleSidebar />
  
        <div className="flex flex-col w-full">
          <Header title="Explore" />
          <div className="flex flex-col items-center justify-center gap-4 h-full border-b mt-10">
            <PostCard />
            <PostCard />
            <PostCard />
            <PostCard />
          </div>
        </div>
        <Sidebar />
      </div>
    )
}