import mongoose from "mongoose";
import { Schema } from "mongoose";

const CommentSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dislikes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

CommentSchema.virtual("url").get(function () {
  return `/comments/${this._id}`;
});

export default mongoose.model("Comment", CommentSchema);
