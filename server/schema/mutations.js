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
        try {
          return new Post({ title, content, authorId }).save();
        } catch (err) {
          console.log("Error creating post. ", err);
        }
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
        try {
          return Post.addComment(authorId, postId, content);
        } catch (err) {
          console.log("Error adding post to comment. ", err);
        }
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
        try {
          return new User({ name, username, email, password }).save();
        } catch (err) {
          console.log("Error adding user. ", err);
        }
      },
    },
    deletePost: {
      type: PostType,
      args: { postId: { type: GraphQLID } },
      resolve(parentValue, { postId }) {
        try {
          return Post.findOneAndDelete({ _id: postId });
        } catch (err) {
          console.log("Error deleting post. ", err);
        }
      },
    },
  },
});

module.exports = mutation;
