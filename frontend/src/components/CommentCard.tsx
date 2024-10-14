import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CommentCardProps } from "@/types/CommentCardType"
import { Link } from "react-router-dom"

export default function CommentCard({ comment }: CommentCardProps) {

  return (
    <Card className="w-4/5 max-w-[32rem]">
      <CardHeader className="flex flex-row items-center gap-4">
        <Link to={`/profile/${comment.author?._id}`}>
          <Avatar>
            <AvatarImage
              src={comment.author?.avatarUrl || "/placeholder-avatar.jpg"}
              alt={`@${comment.author?.username || "Unknown User"}`}
            />
            <AvatarFallback>{comment.author?.username.slice(0, 2).toUpperCase() || "UU"}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col">
          <Link to={`/profile/${comment.author?._id}`}>
            <p className="text-sm font-semibold">@{comment.author?.username}</p>
          </Link>
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
      </CardFooter>
    </Card>
  )
}