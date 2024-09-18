import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect } from "react";

export default function useAuth() {
  const { token, isAuth, setIsAuth, setToken } = useContext(AuthContext);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
      setIsAuth(true); 
    } else {
      setIsAuth(false); 
    }
  }, [setToken, setIsAuth]);

  return { token, isAuth, setToken, setIsAuth };
}
