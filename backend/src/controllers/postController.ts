import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";
import Post, { IPost } from "../models/post";
import { Types } from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const upload = multer({ dest: "./public/data/uploads/" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadImageCloudinary = async (imagePath: string) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload image
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result);
    return result.secure_url;
  } catch (error) {
    console.error(error);
  }
};

// GET /posts
const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const posts = await Post.find()
      .populate("author", "username imgUrl friends")
      .exec();

    if (!posts) {
      return res.status(404).json({ mesasge: "No posts found" });
    }

    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

// GET /posts/users/:id
const getAllUsersPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).exec();

    if (!user) {
      return res
        .status(404)
        .json({ error: `User with ID: ${userId} not found` });
    }

    const friendIds = user.friends.map((friend) => friend._id);

    const posts = await Post.find({
      author: { $in: [...friendIds, user._id] },
    })
      .populate("author", "username avatarUrl")
      .populate("likedBy", "username")
      .populate("comments")
      .sort({ timestamp: -1 })
      .exec();

    if (!posts) {
      return res.status(404).json({ message: "Not posts found" });
    }

    return res.status(200).json(posts);
  } catch (err) {
    return next(err);
  }
};

// GET /posts/:id
const getPostDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(post);
  } catch (err) {
    return next(err);
  }
};

// POST /posts/users/:id
const addPost = [
  upload.single("img_url"),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<any, Record<string, any>>> => {
    try {
      let imageUrl = "";
      if (req.file) {
        try {
          const result = await uploadImageCloudinary(req.file.path);
          console.log(`result: ${result}`);
          imageUrl = result;
        } catch (error) {
          return res.status(500).json({ error: "Error uploading image" });
        }
      } else {
        console.log("No file uploaded or multer configuration issue");
      }

      const userId = req.params.id;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const newPost = new Post({
        author: userId,
        content: req.body.content,
        imgUrl: imageUrl
      });

      if (!newPost) {
        return res.status(404).json({ error: "Error while create a new post" });
      }

      user.posts.push(newPost._id);
      await user.save();
      await newPost.save();

      return res.status(200).json(newPost);
    } catch (err) {
      return next(err);
    }
  },
];

// PUT /posts/:id
const editPost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
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
  } catch (err) {
    next(err);
  }
};

// DELETE /posts/:postId/user/:userId
const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { postId, userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res
        .status(404)
        .json({ error: "Unable to delete post or post not found" });
    }

    user.posts = user.posts.filter((id) => !id.equals(postId));
    await user.save();

    return res
      .status(200)
      .json({ message: "Post successfully deleted", postId });
  } catch (err) {
    return next(err);
  }
};

// POST /posts/:postId/users/:userId/likes
export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { postId, userId } = req.params;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (post.author.equals(user._id)) {
      return res.status(400).json({ error: "You cannot like your own post" });
    }

    const userObjectId = new Types.ObjectId(userId);

    const userHasLiked = post.likedBy.some((likeId) => likeId.equals(userObjectId));
    const userHasDisliked = post.dislikedBy.some((dislikeId) => dislikeId.equals(userObjectId));

    if (userHasLiked) {
      post.likes = Number(post.likes) > 0 ? Number(post.likes) - 1 : 0;
      post.likedBy = post.likedBy.filter((likeId) => !likeId.equals(userObjectId));
    } else {
      post.likes = Number(post.likes) + 1;
      post.likedBy.push(userObjectId);

      if (userHasDisliked) {
        post.dislikes = Number(post.dislikes) > 0 ? Number(post.dislikes) - 1 : 0;
        post.dislikedBy = post.dislikedBy.filter((dislikeId) => !dislikeId.equals(userObjectId));
      }
    }

    await post.save();

    return res.status(200).json({ likes: post.likes, dislikes: post.dislikes });
  } catch (err) {
    return next(err);
  }
};

// GET /posts/:id/likes
const getPostLikedBy = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
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
  } catch (err) {
    return next(err);
  }
};

// POST /posts/:id/dislikes
export const dislikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const { postId, userId } = req.params;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (post.author.equals(user._id)) {
      return res.status(400).json({ error: "You cannot dislike your own post" });
    }

    const userObjectId = new Types.ObjectId(userId);

    const userHasDisliked = post.dislikedBy.some((dislikeId) => dislikeId.equals(userObjectId));
    const userHasLiked = post.likedBy.some((likeId) => likeId.equals(userObjectId));

    if (userHasDisliked) {
      post.dislikes = Number(post.dislikes) > 0 ? Number(post.dislikes) - 1 : 0;
      post.dislikedBy = post.dislikedBy.filter((dislikeId) => !dislikeId.equals(userObjectId));
    } else {
      post.dislikes = Number(post.dislikes) + 1;
      post.dislikedBy.push(userObjectId);

      if (userHasLiked) {
        post.likes = Number(post.likes) > 0 ? Number(post.likes) - 1 : 0;
        post.likedBy = post.likedBy.filter((likeId) => !likeId.equals(userObjectId));
      }
    }

    await post.save();

    return res.status(200).json({ dislikes: post.dislikes, likes: post.likes });
  } catch (err) {
    return next(err);
  }
};

export default {
  getAllPosts,
  getAllUsersPosts,
  getPostDetails,
  addPost,
  editPost,
  deletePost,
  likePost,
  getPostLikedBy,
  dislikePost,
};
