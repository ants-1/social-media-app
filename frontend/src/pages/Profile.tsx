import { useState } from "react"
import CollapsibleSidebar from "@/components/CollapsibleSidebar"
import Header from "@/components/Header"
import ProfileTab from "@/components/ProfileTab"
import Sidebar from "@/components/Sidebar"
import ProfileForm from "@/components/ProfileForm"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useFetchUserData } from "@/hooks/useFetchUserData"
import { AuthorType } from "@/types/AuthorType"
import { CommentType } from "@/types/CommentType"
import { PostType } from "@/types/PostType"
import { useParams } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import useSendFriendRequest from "@/hooks/useSendFriendRequest"

export default function Profile() {
  const [isUpdating, setIsUpdating] = useState(false);
  const { userId } = useParams<{ userId: string }>();
  const { userData } = useFetchUserData(userId);
  const { user } = useAuth();

  const userPosts: PostType[] = userData?.user?.posts || [];
  const userComments: CommentType[] = userData?.user?.comments || [];
  const userFriends: AuthorType[] = userData?.user?.friends || [];
  const userFriendRequests: AuthorType[] = userData?.user?.friendRequests || [];

  const isOwnProfile = user?._id === userId;
  const isFriend = userFriends.some((friend) => friend._id === user?._id);
  const hasFriendRequest = userFriendRequests.some((friendRequest) => friendRequest._id === user?._id);

  const { sendFriendRequest } = useSendFriendRequest();

  function handleSendFriendRequest() {
    sendFriendRequest(user?._id, userId);
    window.location.reload();
  }

  return (
    <div className="flex">
      <CollapsibleSidebar />
      <div className="flex flex-col w-full">
        <Header title="Profile" />
        <div className="flex items-end justify-end min-h-60 max-h-60 py-6 px-6 border-b bg-gray-600"></div>

        <Avatar className="w-36 h-36 bg-gray-400 rounded-full relative -mt-20 left-[10%] mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
          <AvatarFallback>{userData?.user?.username.slice(0, 2).toUpperCase() || "UN"}</AvatarFallback>
        </Avatar>

        <div className={`flex items-center gap-5 w-30 self-end relative right-[10%] -top-16 ${isOwnProfile ? "mt-0" : "mt-10"}`}>
          {isOwnProfile && (
            <>
              <Button
                variant={`${isUpdating ? "outline" : "default"}`}
                onClick={() => setIsUpdating(!isUpdating)}
              >
                {isUpdating ? "Cancel" : "Update Profile"}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">

                  <DropdownMenuItem>Change Banner</DropdownMenuItem>
                  <DropdownMenuItem>Change Avatar</DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>

        <div className="flex justify-around items-center -mt-10">
          {isUpdating ? (
            <ProfileForm userData={userData} setIsUpdating={setIsUpdating} />
          ) : (
            <div>
              <h4>{userData?.user?.name}</h4>
              <h3 className="text-xl font-semibold">@{userData?.user?.username}</h3>
              <p className="text-sm">{userData?.user?.description || "No Bio 😢"}</p>
              <p className="py-4 text-sm">Friends: {userData?.user?.friends?.length || "0"}</p>
              {!isOwnProfile && !hasFriendRequest && !isFriend &&
                <Button variant="outline" onClick={handleSendFriendRequest}>Send Request</Button>
              }
              {isFriend &&
                <Button variant="outline">Remove Friend</Button>
              }
            </div>
          )}
          <p></p>
        </div>

        {!isUpdating && (
          <div className="flex flex-col items-center  gap-4 h-full border-b p-10">
            <ProfileTab posts={userPosts} comments={userComments} friends={userFriends} friendRequests={userFriendRequests} />
          </div>
        )}
      </div>
      <Sidebar />
    </div>
  )
}
