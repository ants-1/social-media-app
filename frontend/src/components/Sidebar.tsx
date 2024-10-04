import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserPlus } from "lucide-react"
import SearchBar from "./SearchBar"
import { useFetchUserData } from "@/hooks/useFetchUserData"
import useAuth from "@/hooks/useAuth"
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers"
import useSendFriendRequest from "@/hooks/useSendFriendRequest"
import useAcceptFriendRequest from "@/hooks/useAcceptFriendRequest"
import useDeleteFriendRequest from "@/hooks/useDeleteFriendRequest"

export default function Sidebar() {
  const { user } = useAuth();
  const { userData } = useFetchUserData(user?._id);
  const { getSuggestedUsers } = useFetchAllUsers();
  const { sendFriendRequest } = useSendFriendRequest();
  const { acceptFriendRequest } = useAcceptFriendRequest();
  const { deleteFriendRequest } = useDeleteFriendRequest();
  const userId = user?._id;

  const suggestedUsers = getSuggestedUsers(userData?.user) || [];

  function handleAcceptFriendRequest(receiverId: string, senderId: string) {
    acceptFriendRequest(receiverId, senderId);
    window.location.reload();
  }

  function handleDeleteFriendRequest(receiverId: string, senderId: string) {
    deleteFriendRequest(receiverId, senderId);
    window.location.reload();
  }

  return (
    <div className="w-full max-w-xs border-l border-gray-200 hidden xl:block">
      <div className="right-0 top-0 z-40 sticky space-y-6 p-4">
        <SearchBar />
        <div>
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Suggested People
          </h2>
          <ul className="space-y-4">
            {
              suggestedUsers.map((user) => (
                <li key={user.username} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.username}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => sendFriendRequest(userId, user._id)}>
                    Send Request
                  </Button>
                </li>
              ))
            }
          </ul>
        </div>

        {userData?.user?.friendRequests?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Friend Requests
            </h2>
            <ul className="space-y-4">
              {userData?.user?.friendRequests?.map((user) => (
                <li key={user.username} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatarUrl} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.username}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" onClick={() => handleAcceptFriendRequest(userId, user._id)}>
                      Accept
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteFriendRequest(userId, user._id)}>
                      Decline
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
