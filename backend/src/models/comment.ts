import mongoose from "mongoose";
import { Schema, Types } from "mongoose";

interface IComment {
  author: Types.ObjectId,
  text: string,
  likes: Number,
  dislikes: Number,
  timestamp: Date,
}

const CommentSchema = new Schema<IComment>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

CommentSchema.virtual("url").get(function () {
  return `/comments/${this._id}`;
});

export default mongoose.model<IComment>("Comment", CommentSchema);
