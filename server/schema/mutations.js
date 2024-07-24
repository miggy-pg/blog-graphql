const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const mongoose = require("mongoose");
const Post = mongoose.model("post");
const Comment = mongoose.model("comment");
const User = mongoose.model("user");
const PostType = require("./post");
const UserType = require("./user");
const CommentType = require("./comment");

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addPost: {
      type: PostType,
      args: {
        authorId: { type: GraphQLID },
        title: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      resolve(parentValue, { title, content, authorId }) {
        return new Post({ title, content, authorId }).save();
      },
    },
    addCommentToPost: {
      type: CommentType,
      args: {
        authorId: { type: GraphQLID },
        postId: { type: GraphQLID },
        content: { type: GraphQLString },
      },
      resolve(parentValue, { content, postId, authorId }) {
        return Post.addComment(authorId, postId, content);
      },
    },
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { name, username, email, password }) {
        return new User({ name, username, email, password }).save();
      },
    },
    deletePost: {
      type: PostType,
      args: { postId: { type: GraphQLID } },
      resolve(parentValue, { postId }) {
        return Post.findOneAndDelete({ _id: postId });
      },
    },
  },
});

module.exports = mutation;
