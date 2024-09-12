import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, UserPlus } from "lucide-react"

export default function Sidebar() {
  return (
    <div className="w-full max-w-xs border-l border-gray-200 hidden lg:block">
      <div className="right-0 top-0 z-40 sticky space-y-6 p-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search" className="pl-8" />
        </div>
        <div>
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Suggested People
          </h2>
          <ul className="space-y-4">
            {[
              { name: "Alice Johnson", username: "@alice_j", avatar: "/avatar1.jpg" },
              { name: "Bob Smith", username: "@bob_smith", avatar: "/avatar2.jpg" },
              { name: "Carol White", username: "@carol_w", avatar: "/avatar3.jpg" },
            ].map((user) => (
              <li key={user.username} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.username}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Send Request
                </Button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Friend Requests
          </h2>
          <ul className="space-y-4">
            {[
              { name: "Alice Johnson", username: "@alice_j", avatar: "/avatar1.jpg" },
              { name: "Bob Smith", username: "@bob_smith", avatar: "/avatar2.jpg" },
              { name: "Carol White", username: "@carol_w", avatar: "/avatar3.jpg" },
            ].map((user) => (
              <li key={user.username} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.username}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Accept Request
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  )
}