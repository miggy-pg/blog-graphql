const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "post",
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    content: { type: String },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
