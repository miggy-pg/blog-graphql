const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
    },
    authorId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PostSchema.statics.likes = async function (postId) {
  try {
    const post = await this.findById(postId);
    ++post.likes;
    return post.save();
  } catch (err) {
    console.log("Failed adding like to post. ", err);
  }
};
PostSchema.statics.findComments = async function (postId) {
  try {
    const post = await this.findById(postId, { __v: 0, _id: 0 })
      .sort({
        createdAt: 1,
      })
      .populate("comments");
    return post.comments;
  } catch (err) {
    console.log("Failed finding comments. ", err);
  }
};

PostSchema.statics.addComment = async function (authorId, postId, content) {
  try {
    const Comment = mongoose.model("comment");
    const post = await this.findById(postId);
    const newComment = await new Comment({ authorId, post, content }).save();
    post.comments.push(newComment);
    post.save();
    return post;
  } catch (err) {
    console.log("Error adding comment to a post. ", err);
  }
};

PostSchema.statics.findPostsByAuthor = function (authorId) {
  try {
    const authorsPost = this.find(
      { authorId },
      {
        __v: 0,
        _id: 0,
      }
    ).sort({ createdAt: 1 });
    return authorsPost;
  } catch (err) {
    console.log("Failed finding all posts by author. ", err);
  }
};

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
