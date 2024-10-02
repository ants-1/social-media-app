import { useState } from "react";

export default function useSendFriendRequest() {
    const [error, setError] = useState<string | null>(null);

    const sendFriendRequest = async (senderId: string, receiverId: string) => {
        setError(null);

        if (!senderId || !receiverId) {
            setError("Invalid ID used");
            return null;
        }

        try {
            const response = await fetch(`http://localhost:3000/users/${senderId}/friendRequests/${receiverId}`, {
                method: "POST",
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

    return { error, sendFriendRequest };
}