import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { AuthorType } from "@/types/AuthorType";

export function useFetchAllUsers() {
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<AuthorType[] | null>(null);
  const { isAuth } = useAuth();

  const fetchUsers = async () => {
    setError(null);

    if (isAuth) {
      try {
        const response = await fetch('http://localhost:3000/users',
          {
            method: "GET",
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          setUsers(null);
          setError(data.error);
        } else {
          setUsers(data);
        }
      } catch (error) {
        setError(`Failed to fetch users: ${error}`);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [isAuth]);

  return { users, setUsers, error };
} 