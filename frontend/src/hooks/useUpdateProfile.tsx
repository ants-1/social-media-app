import { useState } from "react";

export default function useUpdateProfile() {
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (profileData, userId) => {
    setError(null);

    if (!userId) {
      setError("Invalid user ID");
      return null;
    }

    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update profile");
        return null;
      }

      return data;
    } catch (error) {
      setError(`Error while updating user profile: ${error}`);
      return null;
    }
  };

  return { error, updateProfile };
}
