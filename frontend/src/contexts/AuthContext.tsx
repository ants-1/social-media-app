import { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode } from "react";

interface User {
  _id: string;
  username: string;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  isAuth: boolean;
  tokenExpiration: number | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  isAuth: false,
  tokenExpiration: null,
  setToken: () => null,
  setUser: () => null,
  setIsAuth: () => false,
  logout: () => null,
});

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [tokenExpiration, setTokenExpiration] = useState<number | null>(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuth(true);
    } else {
      localStorage.removeItem("token");
      setIsAuth(false);
    }
  }, [token]);

  useEffect(() => {
    const getUserToken = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/user-token", {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          logout();
          return;
        }

        const data = await response.json();
        setUser(data.user);
        setIsAuth(true);
      } catch (error) {
        setUser(null);
        setIsAuth(false);
        console.log(error);
      }
    };

    const getTokenExpirationTime = () => {
      if (token) {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = decodedToken.exp * 1000;
        setTokenExpiration(expirationTime);

        const currentTime = Date.now();
        if (expirationTime < currentTime) {
          logout();
        } else {
          const timeUntilExpiration = expirationTime - currentTime;
          setTimeout(logout, timeUntilExpiration);
        }
      }
    };

    if (token) {
      getUserToken();
      getTokenExpirationTime();
    }
  }, [token]);

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuth(false);
    setTokenExpiration(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuth,
        tokenExpiration,
        setToken,
        setUser,
        setIsAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
