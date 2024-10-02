import { useState } from "react";

export default function useDeleteFriend() {
  const [error, setError] = useState<string | null>(null);

  const deleteFriend = async (userId: string, removedFriendId: string) => {
    setError(null);

    if (!userId || !removedFriendId) {
      setError("Invalid ID");
      return null;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}/friends/${removedFriendId}`, {
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
      setError(`Failed to remove friend ${error}`);
    }
  }

  return { error, deleteFriend };
}