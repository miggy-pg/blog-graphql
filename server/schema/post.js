const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const User = mongoose.model("user");
const Comment = mongoose.model("comment");
const CommentType = require("./comment");
const UserType = require("./user");

const PostType = new GraphQLObjectType({
  name: "PostType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Comment.findPostComments(parentValue.id);
      },
    },
    author: {
      type: UserType,
      resolve(parentValue) {
        return User.find(parentValue.authorId);
      },
    },
  }),
});

module.exports = PostType;
