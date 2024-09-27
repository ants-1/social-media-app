import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { AuthorType } from "@/types/AuthorType";

interface UserData {
  user?: AuthorType;
}

export function useFetchUserData() {
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const { isAuth, user } = useAuth();

  const fetchUserData = async () => {
    setError(null);

    if (!user) {
      console.log("user is null");
      return;
    }

    if (isAuth && user?._id) {
      try {
        const response = await fetch(`http://localhost:3000/users/${user._id}`, {
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
  }, [isAuth, user]);

  return { userData, setUserData, error };
}