import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ThumbsDown, ThumbsUp, MessageCircle } from "lucide-react";
import { PostCardPropsType } from "@/types/PostCardPropsType";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function PostCard({ post }: PostCardPropsType) {
  const [likeCount, setLikeCount] = useState<number>(post.likes || 0);
  const [dislikeCount, setDislikeCount] = useState<number>(post.dislikes || 0);
  const [userLiked, setUserLiked] = useState<boolean>(false);
  const [userDisliked, setUserDisliked] = useState<boolean>(false);
  const [isAuthor, setIsAuthor] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    if (user && post.likedBy.includes(user._id)) {
      setUserLiked(true);
    }
    if (user && post.dislikedBy.includes(user._id)) {
      setUserDisliked(true);
    }
    if (user && post.author._id === user._id) {
      setIsAuthor(true);
    }
  }, [user, post.likedBy, post.dislikedBy, post.author._id]);

  const handleLike = async () => {
    if (isAuthor) return;

    try {
      const response = await fetch(`http://localhost:3000/posts/${post._id}/users/${user?._id}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setLikeCount(data.likes);
        setDislikeCount(data.dislikes);
        setUserLiked(!userLiked);
        if (userDisliked) {
          setUserDisliked(false);
        }
      } else {
        console.error("Failed to like the post", data.error);
      }
    } catch (error) {
      console.error("Error liking the post", error);
    }
  };

  const handleDislike = async () => {
    if (isAuthor) return;

    try {
      const response = await fetch(`http://localhost:3000/posts/${post._id}/users/${user?._id}/dislikes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setDislikeCount(data.dislikes);
        setLikeCount(data.likes);
        setUserDisliked(!userDisliked);
        if (userLiked) {
          setUserLiked(false);
        }
      } else {
        console.error("Failed to dislike the post", data.error);
      }
    } catch (error) {
      console.error("Error disliking the post", error);
    }
  };


  return (
    <Card className="w-4/5 max-w-[32rem] space-y-2">
      <CardHeader className="flex flex-row items-center gap-4">
        <Link to={`/profile/${post.author._id}`}>
          <Avatar>
            <AvatarImage src={post.author.avatarUrl || "/placeholder-avatar.jpg"} alt={`@${post.author.username}`} />
            <AvatarFallback>{post.author.username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex flex-col">
          <Link to={`/profile/${post.author._id}`}>
            <p className="text-sm font-semibold">@{post.author.username}</p>
          </Link>
          <p className="text-xs text-muted-foreground">
            {new Date(post.timestamp).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">
          {post.content}
        </p>
        {post.imgUrl ?
          (
            <img src={post.imgUrl} alt="Post image" />
          ) : ""
        }
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2">
          <Button
            variant={userLiked ? "default" : "ghost"}
            size="sm"
            className={`${userLiked ? "bg-green-600 hover:bg-green-700" : "text-green-600"}`}
            onClick={handleLike}
            disabled={isAuthor}
          >
            <ThumbsUp className="w-4 h-4 mr-1" />
            {likeCount}
          </Button>
          <Button
            variant={userDisliked ? "default" : "ghost"}
            size="sm"
            className={`${userDisliked ? "bg-red-600 hover:bg-red-700" : "text-red-600"}`}
            onClick={handleDislike}
            disabled={isAuthor}
          >
            <ThumbsDown className="w-4 h-4 mr-1" />
            {dislikeCount}
          </Button>
        </div>
        <Link to={`/post/${post._id}`}>
          <Button variant="ghost" size="sm">
            <MessageCircle className="w-4 h-4 mr-1" />
            {post.comments.length}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
