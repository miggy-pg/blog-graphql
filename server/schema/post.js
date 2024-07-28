const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLInt } =
  graphql;
const User = mongoose.model("user");
const Post = mongoose.model("post");
const CommentType = require("./comment");
const UserType = require("./user");

const PostType = new GraphQLObjectType({
  name: "PostType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    likes: { type: GraphQLInt },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        try {
          return Post.findComments(parentValue.id);
        } catch (err) {
          console.log("Error finding all the comments. ", err);
        }
      },
    },
    authorId: {
      type: UserType,
      resolve(parentValue) {
        try {
          return User.findById(parentValue.authorId);
        } catch (err) {
          console.log("Error finding the author of this post. ", err);
        }
      },
    },
  }),
});

module.exports = PostType;
