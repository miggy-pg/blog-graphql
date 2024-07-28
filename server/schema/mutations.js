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
    addLikeToPost: {
      type: PostType,
      args: {
        postId: { type: GraphQLID },
      },
      resolve(parentValue, { postId }) {
        try {
          return Post.likes(postId);
        } catch (err) {
          console.log("Failed adding like to post. ", err);
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
          console.log("Failed adding post to comment. ", err);
        }
      },
    },
    addLikeToComment: {
      type: CommentType,
      args: {
        commentId: { type: GraphQLID },
      },
      resolve(parentValue, { commentId }) {
        try {
          return Comment.likes(commentId);
        } catch (err) {
          console.log("Failed adding like to comment. ", err);
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
          console.log("Failed adding user. ", err);
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
          console.log("Failed to delete post. ", err);
        }
      },
    },
  },
});

module.exports = mutation;
