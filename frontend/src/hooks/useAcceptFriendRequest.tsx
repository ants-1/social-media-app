import { useState } from "react";

export default function useAcceptFriendRequest() {
  const [error, setError] = useState<string | null>(null);

  const acceptFriendRequest = async (receiverId: string, senderId: string) => {
    setError(null);

    if (!senderId || !receiverId) {
      setError("Invalid ID used");
      return null;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${receiverId}/friendRequests/${senderId}`, {
        method: "PUT",
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
      setError(`Failed to send friends request ${error}`);
    }
  }

  return { error, acceptFriendRequest };
}