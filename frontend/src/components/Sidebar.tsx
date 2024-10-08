import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import SearchBar from "./SearchBar";
import { useFetchUserData } from "@/hooks/useFetchUserData";
import useAuth from "@/hooks/useAuth";
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers";
import useSendFriendRequest from "@/hooks/useSendFriendRequest";
import useAcceptFriendRequest from "@/hooks/useAcceptFriendRequest";
import useDeleteFriendRequest from "@/hooks/useDeleteFriendRequest";
import { Link } from "react-router-dom";
import useDeletePendingFriendRequest from "@/hooks/useDeletePendingFriendRequest";

export default function Sidebar() {
  const { user } = useAuth();
  const { userData } = useFetchUserData(user?._id);
  const { getSuggestedUsers } = useFetchAllUsers();
  const { sendFriendRequest } = useSendFriendRequest();
  const { acceptFriendRequest } = useAcceptFriendRequest();
  const { deleteFriendRequest } = useDeleteFriendRequest();
  const { deletePendingFriendRequest } = useDeletePendingFriendRequest();
  const userId = user?._id;

  const suggestedUsers = getSuggestedUsers(userData?.user) || [];

  function handleAcceptFriendRequest(receiverId: string, senderId: string) {
    acceptFriendRequest(receiverId, senderId);
    window.location.reload();
  }

  function handleDeleteFriendRequest(receiverId: string, senderId: string) {
    deleteFriendRequest(receiverId, senderId);
    window.location.reload();
  };

  function handleDeletePendingFriendRequest(senderId: string, receiverId: string) {
    deletePendingFriendRequest(senderId, receiverId);
    window.location.reload();
  }

  return (
    <div className="w-full max-w-xs border-l border-gray-200 hidden xl:block">
      <div className="right-0 top-0 z-40 sticky space-y-6 p-4">
        <SearchBar />

        {/* Suggested People Section */}
        <div>
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Suggested People
          </h2>
          <ul className="space-y-4">
            {suggestedUsers.map((user) => (
              <Link key={user._id} to={`/profile/${user._id}`}>
                <li className="flex items-center justify-between p-1 mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={user.avatarUrl || "/placeholder-avatar.jpg"}
                        alt={`@${user.username}`}
                      />
                      <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">@{user.username}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      sendFriendRequest(userId, user._id);
                    }}
                  >
                    Send Request
                  </Button>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        {/* Friend Requests Section */}
        {userData?.user?.friendRequests?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Friend Requests
            </h2>
            <ul className="space-y-4">
              {userData.user.friendRequests.map((user) => (
                <Link key={user._id} to={`/profile/${user._id}`}>
                  <li className="flex items-center justify-between p-1 mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl || "/placeholder-avatar.jpg"} alt={`@${user.username}`} />
                        <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.username}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.preventDefault();
                        handleAcceptFriendRequest(userId, user._id);
                      }}>
                        Accept
                      </Button>
                      <Button variant="destructive" size="sm" onClick={(e) => {
                        e.preventDefault();
                        handleDeleteFriendRequest(userId, user._id);
                      }}>
                        Decline
                      </Button>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}

        {/* Pending Friend Requests Section */}
        {userData?.user?.pendingFriendRequests?.length > 0 && (
          <div>
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Pending Friend Requests
            </h2>
            <ul className="space-y-4">
              {userData?.user?.pendingFriendRequests.map((user) => (
                <Link key={user._id} to={`/profile/${user._id}`}>
                  <li className="flex items-center justify-between p-1 mb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl || "/placeholder-avatar.jpg"} alt={`@${user.username}`} />
                        {user?.username ? user.username.slice(0, 2).toUpperCase() : "Username"}
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.username}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="destructive" size="sm" onClick={(e) => {
                        e.preventDefault();
                        handleDeletePendingFriendRequest(userId, user._id);
                      }}>
                        Remove
                      </Button>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div >
  );
}
