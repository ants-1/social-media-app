// import PostCard from "./PostCard"
import CommentCard from "./CommentCard"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"

export default function ProfileTab() {
  return (
    <Tabs defaultValue="posts" className="w-4/5 xl:w-3/5 mx-auto">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="likes">Likes</TabsTrigger>
        <TabsTrigger value="friends">Friends</TabsTrigger>
      </TabsList>
      <TabsContent value="posts" className="space-y-4 flex flex-col items-center">
        {/* <PostCard />
        <PostCard />
        <PostCard />
        <PostCard /> */}
      </TabsContent>
      <TabsContent value="comments" className="space-y-4 flex flex-col items-center -mt-0">
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </TabsContent>
      <TabsContent value="likes" className="flex flex-col items-center -mt-0">
        <Card className="w-4/5 max-w-[32rem] ">
          <CardContent className="space-y-4 p-4">
            {[1, 2, 3, 4].map((like) => (
              <div key={like} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt="User avatar" />
                  <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">User Name</p>
                  <p className="text-xs text-gray-500">liked your post</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="friends" className="flex flex-col items-center space-y-4 -mt-0">
        <h3 className="mb-2 text-lg font-semibold">Friend Requests (3)</h3>
        <Card className="w-4/5 max-w-[32rem]">
          <CardContent className="p-4">
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
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Accept Request
                    </Button>
                    <Button variant="destructive" size="sm">
                      X
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <h3 className="mb-2 text-lg font-semibold">Friends (3)</h3>
        <Card className="w-4/5 max-w-[32rem]">
          <CardContent className="p-4">
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
                  <Button variant="destructive" size="sm">
                    Remove Friend
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}