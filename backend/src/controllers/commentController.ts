import { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import Comment from "../models/comment";
import User from "../models/user";

// GET posts/:postId/comments
const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "username imgUrl",
        },
      })
      .populate("author", "username imgUrl")
      .exec();

    if (!post) {
      return res.status(404).json({ error: "No post found" });
    }

    const comments = post.comments;

    if (!comments) {
      return res.status(404).json({ message: "No comments found" });
    }

    return res.status(200).json(comments);
  } catch (err) {
    return next(err);
  }
};

// POST /posts/:postId/users/:userId/comments
const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const newComment = new Comment({
      author: req.body.author,
      text: req.body.text,
    });

    const user = await User.findById(newComment.author);

    if (!user) {
      return res.status(404).json({ error: " User not found"});
    }

    if (!newComment) {
      return res.status(404).json({ error: "Unable to create comment" });
    }

    post.comments.push(newComment._id);
    user.comments.push(newComment._id);
    await newComment.save();
    await post.save();
    await user.save();

    return res.status(200).json(newComment);
  } catch (err) {
    return next(err);
  }
};

// POST /posts/:postId/comments/:commentId/likes
const likeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    const comment = await Comment.findById(commentId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    let likesCount = Number(comment.likes);
    likesCount += 1;

    if (likesCount < Number((await Comment.findById(commentId)).likes)) {
      return res.status(404).json({ error: "Error while liking comment" });
    }

    comment.likes = likesCount;
    await comment.save();

    return res.status(200).json({ likes: comment.likes });
  } catch (err) {
    return next(err);
  }
};

// POST /posts/:postId/comments/:commentId/dislikes
const dislikeComment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { postId, commentId } = req.params;

    const post = await Post.findById(postId);
    const comment = await Comment.findById(commentId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    let dislikesCount = Number(comment.dislikes);
    dislikesCount += 1;

    if (dislikesCount < Number((await Comment.findById(commentId)).likes)) {
      return res.status(404).json({ error: "Error while liking comment" });
    }

    comment.dislikes = dislikesCount;
    await comment.save();

    return res.status(200).json({ dislikes: comment.dislikes });
  } catch (err) {
    return next(err);
  }
};

export default {
  getAllComments,
  createComment,
  likeComment,
  dislikeComment,
};
