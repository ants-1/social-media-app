import CollapsibleSidebar from "@/components/CollapsibleSidebar"
import CommentCard from "@/components/CommentCard"
import { CommentForm } from "@/components/CommentForm"
import PostCard from "@/components/PostCard"
import Sidebar from "@/components/Sidebar"

export default function Post() {
  return (
    <div className="flex">
      <CollapsibleSidebar />

      <div className="flex flex-col w-full">
        <div className="flex items-center justify-center py-6  border-b bg-orange-200">
          <PostCard />
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-full  border-b py-10">
          <div className="flex flex-col items-center justify-center w-full pb-10 border-b">
            <CommentForm />
          </div>
          <h2 className="text-xl font-semibold py-5">Comments</h2>
          <CommentCard />
          <CommentCard />
          <CommentCard />
          <CommentCard />
        </div>
      </div>
      <Sidebar />
    </div>
  )
}