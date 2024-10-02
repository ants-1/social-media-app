import PostCard from "./PostCard"
import ReactLoading from "react-loading";
import CommentCard from "./CommentCard"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "./ui/button"

import { PostType } from "@/types/PostType";
import { ProfileTabProps } from "@/types/ProfileTabProps";
import useAuth from "@/hooks/useAuth";
import { useParams } from "react-router-dom";

export default function ProfileTab({ posts, comments, friends, friendRequests }: ProfileTabProps) {

  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const isOwnProfile = user?._id === userId;

  return (
    <Tabs defaultValue="posts" className="w-4/5 xl:w-3/5 mx-auto">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="comments">Comments</TabsTrigger>
        <TabsTrigger value="friends">Friends</TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="space-y-4 flex flex-col items-center">
        {posts ? (
          posts.length > 0 ? (
            posts.map((post: PostType) => (
              <PostCard key={post._id} post={post} />
            ))
          ) : (
            <p>No posts available</p>
          )
        ) : (
          <ReactLoading className="mt-10" type={"spin"} color="#000" />
        )}
      </TabsContent>

      <TabsContent value="comments" className="space-y-4 flex flex-col items-center">
        {comments ? (
          comments.length > 0 ? (
            comments.map((comment) => (
              <CommentCard key={comment._id} comment={comment} />
            ))
          ) : (
            <p className="mt-10">No comments available</p>
          )
        ) : (
          <ReactLoading className="mt-10" type={"spin"} color="#000" />
        )}
      </TabsContent>

      <TabsContent value="friends" className="flex flex-col items-center space-y-4">
        {isOwnProfile &&
          <>
            <h3 className="mb-2 text-lg font-semibold">
              Friend Requests ({friendRequests ? friendRequests.length : 0})
            </h3>

            {friendRequests ? (
              friendRequests.length > 0 ? (
                <Card className="w-4/5 max-w-[32rem]">
                  <CardContent className="p-4">
                    <ul className="space-y-4">
                      {friendRequests.map((user) => (
                        <li key={user._id} className="flex items-center justify-between">
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
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Accept
                            </Button>
                            <Button variant="destructive" size="sm">
                              Decline
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ) : (
                <p>No friend requests available</p>
              )
            ) : (
              <ReactLoading className="mt-10" type={"spin"} color="#000" />
            )}
          </>
        }
        <h3 className="mb-2 text-lg font-semibold">Friends ({friends ? friends.length : 0})</h3>

        {friends ? (
          friends.length > 0 ? (
            <Card className="w-4/5 max-w-[32rem]">
              <CardContent className="p-4">
                <ul className="space-y-4">
                  {friends.map((user) => (
                    <li key={user._id} className="flex items-center justify-between">
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
                      {isOwnProfile &&
                        <Button variant="destructive" size="sm">
                          Remove Friend
                        </Button>
                      }
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <p>No friends available</p>
          )
        ) : (
          <ReactLoading className="mt-10" type={"spin"} color="#000" />
        )}
      </TabsContent>
    </Tabs>
  );
}
