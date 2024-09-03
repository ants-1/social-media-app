import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

// GET /users
const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find().select("-password").exec();

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json({ users: users });
  } catch (error) {
    console.error("Error while fetching users:", error);
    return res.status(500).json({ error: "Error while fetching users" });
  }
};

// GET /users/:id
const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).exec();

    if (!user) {
      return res.status(404).json({ message: `User with id: ${id} not found` });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error while fetching user:", error);
    return res.status(500).json({ error: "Error while fetching user" });
  }
};

// PUT /users/:id
const updateUserDate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const updatedUser = {
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      description: req.body.description,
      location: req.body.location,
    };

    const user = await User.findByIdAndUpdate(id, updatedUser, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ error: "Username not found." });
    }

    return res.status(200).json({ updatedUser });
  } catch (error) {
    console.error("Error while updating user information", error);
    return res
      .status(500)
      .json({ error: "Error while updating user information:" });
  }
};

// PUT /users/password
// const updateUserPassword = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const user = req.user as IUser;
//     const hashedPassword = await bcrypt.hash(user.password, 10);

//     if (user) {
//       const id = user._id;
//       const updatedUser = await User.findByIdAndUpdate(
//         id,
//         { password: hashedPassword },
//         { new: true }
//       );
//       return res.status(200).json(updatedUser);
//     }
//   } catch (error) {
//     console.error("Error while updating user password", error);
//     return res
//       .status(500)
//       .json({ error: "Error while updating user password" });
//   }
// };

// const updateAvatarPic = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

// const updateBannerPic = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {};

// POST /users/:senderId/friendRequests/:receiverId
const handleSendFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { senderId, receiverId } = req.params;

    const senderObjectId = new Types.ObjectId(senderId);
    const receiverObjectId = new Types.ObjectId(receiverId);

    const sender = await User.findById(senderObjectId);
    const receiver = await User.findById(receiverObjectId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found"});
    }

    // Check if receiver has already made a friend request
    const alreadyRequested = receiver.friendRequests.some((id) => id.equals(senderObjectId));

    if (alreadyRequested) {
      return res.status(400).json({ error: "Sender has already made a friend request"});
    }
    
    const alreadyFriends = sender.friends.some((id) => id.equals(receiverObjectId));

    if (alreadyFriends) {
      return res.status(400).json({ error: "Sender is already friends with receiver" });
    }

    receiver.friendRequests.push(senderObjectId);
    await receiver.save();

    return res.status(200).json({ message: "Follow request sent", receiver});

  } catch (error) {
    console.error("Error while sending friend request", error);
    return res.status(500).json({ error: "Error while sending friend request"});
  }
}

// PUT users/:receiverId/friendRequest/:senderId
export const handleAcceptFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiverId, senderId } = req.params;

    const receiverObjectId = new Types.ObjectId(receiverId);
    const senderObjectId = new Types.ObjectId(senderId);

    const receiver = await User.findById(receiverObjectId);
    const sender = await User.findById(senderObjectId);

    if (!receiver || !sender) {
      return res.status(404).json({ error: "Receiver or sender not found" });
    }

    const isRequested = receiver.friendRequests.some(friendRequestId =>
      senderObjectId.equals(friendRequestId)
    );

    if (isRequested) {
      receiver.friendRequests = receiver.friendRequests.filter(
        friendRequestId => !senderObjectId.equals(friendRequestId)
      );
      sender.friendRequests = sender.friendRequests.filter(
        friendRequestId => !receiverObjectId.equals(friendRequestId)
      );

      receiver.friends.push(senderObjectId);
      sender.friends.push(receiverObjectId);

      await receiver.save();
      await sender.save();

      return res.status(200).json({ message: "Friend request accepted", receiver, sender });
    }

    return res.status(404).json({ error: "Friend request not found or already accepted" });

  } catch (error) {
    console.error("Error while accepting friend request:", error);
    return res.status(500).json({ error: "Error while accepting friend request" });
  }
};


// DELETE users/:receiverId/friendRequest/:senderId
const handleDeleteFriendRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { receiverId, senderId } = req.params;

    const receiverObjectId = new Types.ObjectId(receiverId);
    const senderObjectId = new Types.ObjectId(senderId);

    const receiver = await User.findById(receiverObjectId);
    const sender = await User.findById(senderObjectId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: "Sender or receiver not found" });
    }

    const isRequested = receiver.friendRequests.some((id) => id.equals(senderObjectId));

    if (!isRequested) {
      return res.status(404).json({ error: "Friend request not found" });
    }

    receiver.friendRequests = receiver.friendRequests.filter((id) => !id.equals(senderObjectId));

    await receiver.save();

    return res.status(200).json({ message: "Friend request deleted successfully", receiver, sender });

  } catch (error) {
    console.error("Error while deleting friend request", error);
    return res.status(500).json({ error: "Error while deleting friend request" });
  }
};


// DELETE /users/:userId/friends/:removedFriendId"
const handleRemoveFriend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, removedFriendId } = req.params;

    const user = await User.findById(userId);
    const removedFriend = await User.findById(removedFriendId);

    if (!user || !removedFriend) {
      return res.status(404).json({ error: "User or friend not found" });
    }

    user.friends = user.friends.filter((id) => !id.equals(removedFriendId));

    removedFriend.friends = removedFriend.friends.filter((id) => !id.equals(userId));

    const userFriendRemoved = user.friends.length < (await User.findById(userId)).friends.length;
    const removedFriendUserRemoved = removedFriend.friends.length < (await User.findById(removedFriendId)).friends.length;

    if (!userFriendRemoved || !removedFriendUserRemoved) {
      return res.status(404).json({ error: "Error removing friend from one or both friends lists" });
    }

    await user.save();
    await removedFriend.save();

    return res.status(200).json({ message: "Friendship successfully removed from both users" });

  } catch (error) {
    console.error("Error while deleting friend from friend list:", error);
    return res.status(500).json({ error: "Error while deleting friend from friend list" });
  }
};



export default {
  getAllUsers,
  getUserById,
  updateUserDate,
  // updateUserPassword,
  handleSendFriendRequest,
  handleAcceptFriendRequest,
  handleDeleteFriendRequest,
  handleRemoveFriend,
};
