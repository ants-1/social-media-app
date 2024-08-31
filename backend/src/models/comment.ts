import mongoose, { Model, Schema, Types } from "mongoose";

export interface IComment {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  text: string;
  likes: Number;
  dislikes: Number;
  timestamp: Date;
};

type CommentModel = Model<IComment>;

const CommentSchema = new Schema<IComment, CommentModel>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  text: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now },
});

CommentSchema.virtual("url").get(function () {
  return `/comments/${this._id}`;
});

export default mongoose.model<IComment, CommentModel>("Comment", CommentSchema);
