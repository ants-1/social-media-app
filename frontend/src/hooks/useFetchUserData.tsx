import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { AuthorType } from "@/types/AuthorType";

interface UserData {
  user?: AuthorType;
}

export function useFetchUserData(userId: string) {
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  
  const { isAuth } = useAuth();

  const fetchUserData = async () => {
    setError(null);

    if (isAuth && userId) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          setError(`Error: ${data.message || "Failed to fetch user data"}`);
          setUserData(null);
        } else {
          setUserData(data);
        }

      } catch (error) {
        setError(`Failed to fetch user data: ${error}`);
      }
    }
  }

  useEffect(() => {
    fetchUserData();
  }, [isAuth, userId]);

  return { userData, setUserData, error };
}