import { Home, Hash, Users, Settings } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  const { theme } = useTheme();

  const renderIcon = () => {
    switch (title.toLowerCase()) {
      case "home":
        return <Home className="mx-2 h-6 w-6" />;
      case "explore":
        return <Hash className="mx-2 h-6 w-6" />;
      case "profile":
        return <Users className="mx-2 h-6 w-6" />;
      case "settings":
        return <Settings className="mx-2 h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <div className={`w-full min-h-20 top-0 sticky border-b flex items-center pl- 5 ${theme === 'dark' ? 'bg-orange-400' : 'bg-orange-200'} z-40`}>
      {renderIcon()}
      <h1 className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} text-xl font-semibold`}>{title}</h1>
    </div>
  );
}
