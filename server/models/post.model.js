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
  },
  { timestamps: true }
);

PostSchema.statics.findComments = async function (postId) {
  const post = await this.findById(postId, { __v: 0, _id: 0 })
    .sort({
      createdAt: 1,
    })
    .populate("comments");
  return post.comments;
};

PostSchema.statics.addComment = function (authorId, postId, content) {
  const Comment = mongoose.model("comment");
  return this.findById(postId).then((post) => {
    const comment = new Comment({ authorId, post, content });
    post.comments.push(comment);
    return Promise.all([comment.save(), post.save()]).then(
      (comment, post) => post
    );
  });
};

// We can also use this approach on adding comments to a post
// PostSchema.statics.addComment = async function (authorId, postId, content) {
//   const Comment = mongoose.model("comment");
//   const post = await this.findById(postId);
//   const newComment = await new Comment({ authorId, post, content }).save();
//   post.comments.push(newComment);
//   post.save();
//   return post;
// };

PostSchema.statics.findPostsByAuthor = function (authorId) {
  return this.find(
    { authorId },
    {
      __v: 0,
      _id: 0,
    }
  )
    .sort({ createdAt: 1 })
    .then((post) => {
      return { post };
    });
};

const Post = mongoose.model("post", PostSchema);

module.exports = Post;
