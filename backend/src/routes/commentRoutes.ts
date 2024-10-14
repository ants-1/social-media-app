import express from "express";
import commentController from "../controllers/commentController";

const router = express.Router();

router.get("/posts/:postId/comments", commentController.getAllComments);

router.post("/posts/:postId/comments", commentController.createComment);

export default router