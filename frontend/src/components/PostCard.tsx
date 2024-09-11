import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ThumbsDown, ThumbsUp, MessageCircle } from "lucide-react"

export default function PostCard() {
  const [likeCount, setLikeCount] = useState(42)
  const [dislikeCount, setDislikeCount] = useState(8)
  const [userLiked, setUserLiked] = useState(false)
  const [userDisliked, setUserDisliked] = useState(false)

  const handleLike = () => {
    if (userLiked) {
      setLikeCount(likeCount - 1)
      setUserLiked(false)
    } else {
      setLikeCount(likeCount + 1)
      setUserLiked(true)
      if (userDisliked) {
        setDislikeCount(dislikeCount - 1)
        setUserDisliked(false)
      }
    }
  }

  const handleDislike = () => {
    if (userDisliked) {
      setDislikeCount(dislikeCount - 1)
      setUserDisliked(false)
    } else {
      setDislikeCount(dislikeCount + 1)
      setUserDisliked(true)
      if (userLiked) {
        setLikeCount(likeCount - 1)
        setUserLiked(false)
      }
    }
  }

  return (
    <Card className="w-2/3 lg:w-3/5 space-y-2">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src="/placeholder-avatar.jpg" alt="@username" />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">@username</p>
          <p className="text-xs text-muted-foreground">Posted on April 20, 2023</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          This is a sample post content. It can be a longer text describing the user's thoughts, experiences, or any other content they want to share with their followers.
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant={userLiked ? "default" : "ghost"}
            size="sm"
            className={`${userLiked ? "bg-green-600 hover:bg-green-700" : "text-green-600"}`}
            onClick={handleLike}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {likeCount}
          </Button>
          <Button
            variant={userDisliked ? "default" : "ghost"}
            size="sm"
            className={`${userDisliked ? "bg-red-600 hover:bg-red-700" : "text-red-600"}`}
            onClick={handleDislike}
          >
            <ThumbsDown className="w-4 h-4 mr-1" />
            {dislikeCount}
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-1" />42
        </Button>
      </CardFooter>
    </Card>
  )
}