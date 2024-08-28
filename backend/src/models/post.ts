import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

interface IPost {
  author: Types.ObjectId,
  content: string,
  imgUrl: string,
  likes: Number,
  likedBy: [Types.ObjectId],
  dislikes: Number,
  comments: [Types.ObjectId],
  timestamp: Date,
}

const PostSchema = new Schema<IPost>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  imgUrl: { type: String, default: "" },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dislikes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  timestamp: { type: Date, default: Date.now },
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

export default mongoose.model<IPost>("Post", PostSchema);
