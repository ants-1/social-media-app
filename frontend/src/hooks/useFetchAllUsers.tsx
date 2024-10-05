import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { AuthorType } from "@/types/AuthorType";

export function useFetchAllUsers() {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AuthorType[]>([]);
  const { isAuth } = useAuth();

  const fetchUsers = async () => {
    setError(null);

    if (isAuth) {
      try {
        const response = await fetch('http://localhost:3000/users', {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setUsers([]); 
          setError(data.error);
        } else {
          setUsers(data);
        }
      } catch (error) {
        setError(`Failed to fetch users: ${error}`);
        setUsers([]);
      }
    }
  };

  const getSuggestedUsers = (currentUser: AuthorType) => {
    if (!users || !currentUser) return [];

    const currentFriendIds = currentUser.friends?.map(friend => friend._id) || [];
    const currentFriendRequestIds = currentUser.friendRequests?.map(request => request._id) || [];
    const currentPendingFriendRequestIds = currentUser.pendingFriendRequests?.map(request => request._id) || [];

    const suggestedUsers = users?.users?.filter(user => {
      const isFriend = currentFriendIds.includes(user._id);
      const hasFriendRequest = currentFriendRequestIds.includes(user._id);
      const hasPendingFriendRequest = currentPendingFriendRequestIds.includes(user._id);
      return !isFriend && !hasFriendRequest && !hasPendingFriendRequest && user._id !== currentUser._id;
    });

    return suggestedUsers?.slice(0, 3) || [];  // Always return an empty array if undefined
  };

  useEffect(() => {
    fetchUsers();
  }, [isAuth]);

  return { users, setUsers, error, getSuggestedUsers };
}
