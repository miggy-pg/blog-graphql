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
  },
  { timestamps: true }
);

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
