import { useState } from "react";

export default function useDeleteFriendRequest() {
    const [error, setError] = useState<string | null>(null);

  const deleteFriendRequest = async (receiverId: string, senderId: string) => {
    setError(null);

    if (!senderId || !receiverId) {
      setError("Invalid ID");
      return null;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${receiverId}/friendRequests/${senderId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error);
        return data;
      } else {
        return data;
      }
    } catch (error) {
      setError(`Failed to delete friends request ${error}`);
    }
  }

  return { error, deleteFriendRequest };
}