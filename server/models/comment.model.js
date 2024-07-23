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

CommentSchema.statics.findPostComments = function (postId) {
  return this.find({ postId }, { __v: 0, _id: 0 }).sort({ createdAt: 1 });
};

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
