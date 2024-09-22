import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThumbsDown, ThumbsUp, MessageCircle } from "lucide-react";
import { PostCardPropsType } from "@/types/PostCardPropsType";

export default function PostCard({ post }: PostCardPropsType) {
  const [likeCount, setLikeCount] = useState<number>(post.likes || 0);
  const [dislikeCount, setDislikeCount] = useState<number>(post.dislikes || 0);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [userDisliked, setUserDisliked] = useState<boolean>(false);

  const handleLike = () => {
    if (userLiked) {
      setLikeCount(likeCount - 1);
      setUserLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setUserLiked(true);
      if (userDisliked) {
        setDislikeCount(dislikeCount - 1);
        setUserDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (userDisliked) {
      setDislikeCount(dislikeCount - 1);
      setUserDisliked(false);
    } else {
      setDislikeCount(dislikeCount + 1);
      setUserDisliked(true);
      if (userLiked) {
        setLikeCount(likeCount - 1);
        setUserLiked(false);
      }
    }
  };

  return (
    <Card className="w-4/5 max-w-[32rem] space-y-2">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage src={post.author.imgUrl || "/placeholder-avatar.jpg"} alt={`@${post.author.username}`} />
          <AvatarFallback>{post.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">@{post.author.username}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(post.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">
          {post.content}
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
          <MessageCircle className="w-4 h-4 mr-1" />
          {post.comments.length}
        </Button>
      </CardFooter>
    </Card>
  );
}
