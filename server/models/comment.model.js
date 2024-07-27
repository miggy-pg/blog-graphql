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
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CommentSchema.statics.likes = async function (commentId) {
  try {
    const comment = await this.findById(commentId);
    ++comment.likes;
    return comment.save();
  } catch (err) {
    console.log("Error adding like to comment. ", err);
  }
};

const Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;
