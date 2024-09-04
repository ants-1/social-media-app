import express from "express";
import postController from "../controllers/postController";

const router = express.Router();

router.get("/posts", postController.getAllPosts);

router.get("/posts/:id", postController.getPostDetails);

router.post("/posts/users/:id", postController.addPost);

router.put("/posts/:id", postController.editPost);

router.delete("/posts/:postId/users/:userId", postController.deletePost);

router.post("/posts/:postId/users/:userId/likes", postController.likePost);

router.get("/posts/:id/likes", postController.getPostLikedBy);

router.post("/posts/:id/dislikes", postController.dislikePost);

export default router;
