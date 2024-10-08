import { Route, Routes } from "react-router-dom";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { PostProvider } from "./contexts/PostContext";
import useAuth from "./hooks/useAuth";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        } transition-colors duration-300`}
    >
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Private Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/post/:postId" element={<Post />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </div>
  );
}

function App() {
  const { isAuth } = useAuth();

  return (
    <PostProvider>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Routes>
          {isAuth ? (
            <Route path="*" element={<AppContent />} />
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </ThemeProvider>
    </PostProvider>
  );
}

export default App;
