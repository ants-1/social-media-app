import { useState } from "react";

export default function useDeletePendingFriendRequest() {
  const [error, setError] = useState<string | null>(null);

  const deletePendingFriendRequest = async (receiverId: string, senderId: string) => {
    setError(null);

    if (!senderId || !receiverId) {
      setError("Invalid ID");
      return null;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${receiverId}/pendingFriendRequests/${senderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to delete pending friend request");
        return data;
      } else {
        return data;
      }
    } catch (error) {
      setError(`Failed to delete pending friend request: ${error}`);
    }
  }

  return { error, deletePendingFriendRequest };
}
