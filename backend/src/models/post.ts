import mongoose, { Schema, Types, Model }  from "mongoose";

export interface IPost {
  _id: Types.ObjectId;
  author: Types.ObjectId;
  content: string;
  imgUrl: string;
  likes: Number;
  likedBy: Types.ObjectId[],
  dislikes: Number,
  dislikedBy: Types.ObjectId[],
  comments: Types.ObjectId[],
  timestamp: Date,
}

type PostModel = Model<IPost>;

const PostSchema = new Schema<IPost, PostModel>({
  author: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  imgUrl: { type: String, default: "" },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  dislikes: { type: Number, default: 0 },
  dislikedBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  timestamp: { type: Date, default: Date.now },
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

export default mongoose.model<IPost, PostModel>("Post", PostSchema);
