import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom"

export default function SearchBar() {
  const { users } = useFetchAllUsers()
  const [searchInput, setSearchInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const filteredUsers = Array.isArray(users?.users)
    ? users?.users.filter(user =>
      user.username.toLowerCase().includes(searchInput.toLowerCase())
    )
    : []

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users"
          onChange={handleChange}
          value={searchInput}
          className="pl-8"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        />
      </div>
      {isFocused && searchInput && (
        <div className="absolute z-50 w-full mt-1 bg-background border border-input rounded-md shadow-lg max-h-60 overflow-auto">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <Link to={`/profile/${user._id}`}>
                <Card key={user._id} className="border-0 rounded-none">
                  <CardContent className="p-2 hover:bg-muted cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatarUrl || ""} alt={user.name} />
                        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <Card className="border-0">
              <CardContent className="p-2 text-muted-foreground">
                No users found
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}