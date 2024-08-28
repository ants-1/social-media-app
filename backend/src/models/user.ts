import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

interface IUser {
  username: string,
  user_handle: string,
  email: string,
  password: string,
  avatarUrl?: string,
  bannerUrl?: string,
  description?: string,
  location?: string,
  followRequest?: [Types.ObjectId],
  followers?: [Types.ObjectId],
  following?: [Types.ObjectId],
  posts?: [Types.ObjectId],
  comments?: [Types.ObjectId],
  dateJoined: Date,
}

const UserSchema = new Schema<IUser>({
  username: { type: String, maxLength: 100, required: true, unique: true },
  user_handle: { type: String, maxLength: 100, required: true, unique: true },
  email: { type: String, maxLength: 256, required: true, unique: true },
  password: { type: String, required: true },
  avatarUrl: { type: String }, 
  bannerUrl: { type: String },
  description: { type: String },
  location: { type: String, maxLength: 150 },
  followRequest: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  dateJoined: { type: Date, default: Date.now },
});

UserSchema.virtual('url').get(function() {
  return `/user/${this._id}`;
});

export default mongoose.model<IUser>('User', UserSchema);
