const mongoose = require("mongoose");
const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString } = graphql;
const GraphQLDate = require("graphql-date");
const User = mongoose.model("user");
const UserType = require("./user");

const CommentType = new GraphQLObjectType({
  name: "CommentType",
  fields: () => ({
    id: { type: GraphQLID },
    postId: { type: GraphQLID },
    content: { type: GraphQLString },
    createdAt: { type: GraphQLDate },
    author: {
      type: UserType,
      resolve(parentValue) {
        const Comment = mongoose.model("comment");
        return Comment.findById(parentValue.id)
          .populate("authorId")
          .then((comment) => {
            return comment.authorId;
          })
          .catch((err) => {
            console.log(err);
            return;
          });
      },
    },
  }),
});

module.exports = CommentType;
