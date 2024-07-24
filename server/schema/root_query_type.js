const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const PostType = require("./post");
const UserType = require("./user");
const CommentType = require("./comment");
const User = mongoose.model("user");
const Comment = mongoose.model("comment");
const Post = mongoose.model("post");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      },
    },
    user: {
      type: new GraphQLList(UserType),
      resolve(parentValue, { id }) {
        return User.findById({ id });
      },
    },
    post: {
      type: PostType,
      args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, { postId }) {
        const post = await Post.findById({ _id: postId });
        return post;
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      },
    },
    postsByAuthor: {
      type: new GraphQLList(PostType),
      args: { authorId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { authorId }) {
        return Post.findPostsByAuthor(authorId);
      },
    },
    postComments: {
      type: new GraphQLList(CommentType),
      args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { postId }) {
        return Post.findComments(postId);
      },
    },
    comments: {
      type: CommentType,
      resolve() {
        return Comment.find({});
      },
    },
  }),
});

module.exports = RootQuery;
