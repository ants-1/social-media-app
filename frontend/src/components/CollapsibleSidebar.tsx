import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, ChevronLeft, Home, Settings, Users, LogOutIcon, HashIcon } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function CollapsibleSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function handleLogout() {
    logout();
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="left-0 top-0 z-40 h-screen transition-all duration-300 sticky ease-in-out border-r border-gray-200"
    >
      <div className="flex h-full">
        <div className={`flex flex-col ${isOpen ? 'w-64' : 'w-18'} p-4`}>
          <div className="mb-4 flex items-center justify-between">
            {isOpen && <h2 className="text-lg font-semibold">SocialSphere</h2>}
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 md:block hidden">
                {isOpen ? <ChevronLeft className="h-6 w-6" /> : <ChevronRight className="h-6 w-6" />}
                <span className="sr-only">{isOpen ? 'Close sidebar' : 'Open sidebar'}</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <ScrollArea className="flex-grow">
            <CollapsibleContent forceMount className="flex flex-col space-y-2">
              <Link to="/">
                <Button variant="ghost" className="justify-start h-12 w-full">
                  <Home className="mx-2 h-6 w-6" />
                  {isOpen && <span>Home</span>}
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="ghost" className="justify-start h-12 w-full">
                  <HashIcon className="mx-2 h-6 w-6" />
                  {isOpen && <span>Explore</span>}
                </Button>
              </Link>
              <Link to={`/profile/${user?._id}`}>
                <Button variant="ghost" className="justify-start h-12 w-full">
                  <Users className="mx-2 h-6 w-6" />
                  {isOpen && <span>Profile</span>}
                </Button>
              </Link>
              <Link to="/settings">
                <Button variant="ghost" className="justify-start h-12 w-full">
                  <Settings className="mx-2 h-6 w-6" />
                  {isOpen && <span>Settings</span>}
                </Button>
              </Link>
              <Button variant="ghost" className="justify-start h-12 w-full" onClick={handleLogout}>
                <LogOutIcon className="mx-2 h-6 w-6" />
                {isOpen && <span>Logout</span>}
              </Button>
            </CollapsibleContent>
          </ScrollArea>
        </div>
      </div>
    </Collapsible>
  );
}
