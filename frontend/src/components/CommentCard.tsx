import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ThumbsDown, ThumbsUp, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function CommentCard({ comment }) {
  const [likeCount, setLikeCount] = useState(15)
  const [dislikeCount, setDislikeCount] = useState(2)
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
    <Card className="w-4/5 max-w-[32rem]">
      <CardHeader className="flex flex-row items-center gap-4">
      <Avatar>
          <AvatarImage src={comment.author.imgUrl || "/placeholder-avatar.jpg"} alt={`@${comment.author.username}`} />
          <AvatarFallback>{comment.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">@{comment.author.username}</p>
          <p className="text-xs text-muted-foreground">{new Date(comment.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="ml-auto h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          {comment.text}
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
      </CardFooter>
    </Card>
  )
}