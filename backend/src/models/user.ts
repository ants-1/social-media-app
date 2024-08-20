import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, maxLength: 100, required: true, unique: true },
  user_handle: { type: String, maxLength: 100, required: true, unique: true },
  email: { type: String, maxLength: 256, required: true, unique: true },
  password: { type: String, maxLength: 150, required: true },
  avatar_url: { type: String }, 
  banner_url: { type: String },
  description: { type: String },
  location: { type: String, maxLength: 150 },
  follow_request: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  date_joined: { type: Date, default: Date.now },
});

UserSchema.virtual('url').get(function() {
  return `/user/${this._id}`;
});

export default mongoose.model('User', UserSchema);
