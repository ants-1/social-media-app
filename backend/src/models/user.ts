import mongoose, { Model, Schema, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  googleId?: string;
  username?: string;
  name: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  bannerUrl?: string;
  description?: string;
  location?: string;
  pendingFriendRequests?: Types.ObjectId[];
  friendRequests?: Types.ObjectId[];
  friends?: Types.ObjectId[];
  posts?: Types.ObjectId[];
  comments?: Types.ObjectId[];
  dateJoined?: Date;
}

type UserModel = Model<IUser>;

const UserSchema = new Schema<IUser, UserModel>({
  googleId: { type: String },
  username: { type: String, maxLength: 100, required: true, unique: true },
  name: { type: String, maxLength: 100, required: true },
  email: { type: String, maxLength: 256, required: true, unique: true },
  password: { type: String },
  avatarUrl: { type: String }, 
  bannerUrl: { type: String },
  description: { type: String },
  location: { type: String, maxLength: 150 },
  pendingFriendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }],
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  dateJoined: { type: Date, default: Date.now },
});

UserSchema.virtual('url').get(function() {
  return `/user/${this._id}`;
});

export default mongoose.model<IUser, UserModel>('User', UserSchema);
