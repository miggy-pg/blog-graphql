const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
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
    comments: {
      type: new GraphQLList(CommentType),
      resolve(parentValue) {
        return Post.findComments(parentValue.id);
      },
    },
    authorId: {
      type: UserType,
      resolve(parentValue) {
        return User.findById({ _id: parentValue.authorId });
      },
    },
  }),
});

module.exports = PostType;
