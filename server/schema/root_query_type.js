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
        try {
          return User.find({});
        } catch (err) {
          console.log("Error finding for all users. ", err);
        }
      },
    },
    user: {
      type: new GraphQLList(UserType),
      resolve(parentValue, { id }) {
        try {
          return User.findById(id);
        } catch (err) {
          console.log("Error finding for user. ", err);
        }
      },
    },
    post: {
      type: PostType,
      args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { postId }) {
        try {
          return Post.findById(postId);
        } catch (err) {
          console.log("Error finding post. ", err);
        }
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        try {
          return Post.find({});
        } catch (err) {
          console.log("Error finding for all posts. ", err);
        }
      },
    },
    postsByAuthor: {
      type: new GraphQLList(PostType),
      args: { authorId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { authorId }) {
        try {
          return Post.findPostsByAuthor(authorId);
        } catch (err) {
          console.log("Error finding all posts by author. ", err);
        }
      },
    },
    postComments: {
      type: new GraphQLList(CommentType),
      args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { postId }) {
        try {
          return Post.findComments(postId);
        } catch (err) {
          console.log("Error finding all comments in a post. ", err);
        }
      },
    },
    comment: {
      type: CommentType,
      args: { commentId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { commentId }) {
        try {
          return Comment.findById(commentId);
        } catch (err) {
          console.log("Error finding comment. ", err);
        }
      },
    },
    comments: {
      type: CommentType,
      resolve() {
        try {
          return Comment.find({});
        } catch (err) {
          console.log("Error finding all comments. ", err);
        }
      },
    },
  }),
});

module.exports = RootQuery;
