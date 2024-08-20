import mongoose from "mongoose";
import { Schema } from "mongoose";

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  img_url: { type: String, default: "" },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dislikes: { type: Number, default: 0 },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  timestamp: { type: Date, default: Date.now },
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

export default mongoose.model("Post", PostSchema);
