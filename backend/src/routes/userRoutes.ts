import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router.get("/users", userController.getAllUsers);

router.get("/users/:id", userController.getUserById);

router.put("/users/:id", userController.updateUserDate);

// router.put("/users/password", userController.updateUserPassword);

router.post("/users/:senderId/friendRequests/:receiverId", userController.handleSendFriendRequest);

router.put("/users/:receiverId/friendRequests/:senderId", userController.handleAcceptFriendRequest);

router.delete("/users/:receiverId/friendRequests/:senderId", userController.handleDeleteFriendRequest);

router.delete("/users/:userId/friends/:removedFriendId", userController.handleRemoveFriend)

export default router;