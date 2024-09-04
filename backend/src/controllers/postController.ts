import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";
import Post, { IPost } from "../models/post";
import { Types } from "mongoose";

// GET /posts
const getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find().exec();

    if (!posts) {
      return res.status(404).json({ mesasge: "No posts found" });
    }

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error while fetching posts:", error);
    return res.status(500).json({ error: "Error while fetching posts" });
  }
};

// GET /posts/:id
const getPostDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error while fecthing post", error);
    return res.status(500).json({ error: "Error while fetching post" });
  }
};

// POST /posts/users/:id
const addPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newPost = new Post({
      author: userId,
      content: req.body.content,
    });

    if (!newPost) {
      return res.status(404).json({ error: "Error while create a new post" });
    }

    user.posts.push(newPost._id);
    await user.save();
    await newPost.save();

    return res.status(200).json(newPost);
  } catch (error) {
    console.error("Error while creating a new post", error);
    return res.status(500).json({ error: "Error while creating a new post" });
  }
};

// PUT /posts/:id
const editPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const updatedPost = {
      content: req.body.content,
    };

    const post = await Post.findByIdAndUpdate(id, updatedPost, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (error) {
    console.error("Error while updating post:", error);
    return res.status(500).json({ error: "Error while updating post" });
  }
};

// DELETE /posts/:postId/user/:userId
const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId, userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Unable to delete post or post not found" });
    }

    user.posts = user.posts.filter((id) => !id.equals(postId));
    await user.save();

    return res.status(200).json({ message: "Post successfully deleted", postId });
  } catch (error) {
    console.error("Error while deleting post:", error);
    return res.status(500).json({ error: "Error while deleting post" });
  }
};


// POST /posts/:postId/users/:userId/likes
const likePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId, userId } = req.params;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    const userObjectId = new Types.ObjectId(userId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found"});
    }

    let likesCount = Number(post.likes);
    likesCount += 1;

    if (likesCount < Number((await Post.findById(postId)).likes)) {
      return res.status(404).json({ error: "Error while liking post" });
    }

    post.likedBy.push(userObjectId);
    post.likes = likesCount;
    await post.save();

    return res.status(200).json({ likes: post.likes });
  } catch (error) {
    console.error("Error while liking post:", error);
    res.status(500).json({ error: "Erro while liking post" });
  }
};

// GET /posts/:id/likes
const getPostLikedBy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const likedBy = post.likedBy;

    if (likedBy.length === 0) {
      return res.status(404).json({ message: "Post has 0 likes" });
    }

    return res.status(200).json(likedBy);
  } catch (error) {
    console.error("Error while fetching post's liked by:", error);
    return res
      .status(500)
      .json({ error: "Error while fetching post's liked by" });
  }
};

// POST /posts/:id/dislikes
const dislikePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    let dislikesCount = Number(post.dislikes);
    dislikesCount += 1;

    if (dislikesCount < Number((await Post.findById(id)).dislikes)) {
      return res.status(404).json({ error: "Error while disliking post" });
    }

    post.dislikes = dislikesCount;
    await post.save();

    return res.status(200).json({ dislikes: post.dislikes });
  } catch (error) {}
};

export default {
  getAllPosts,
  getPostDetails,
  addPost,
  editPost,
  deletePost,
  likePost,
  getPostLikedBy,
  dislikePost,
};
