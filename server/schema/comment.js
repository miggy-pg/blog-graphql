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
    likes: { type: GraphQLInt },
    author: {
      type: UserType,
      async resolve(parentValue) {
        const Comment = mongoose.model("comment");
        try {
          const comment = await Comment.findById(parentValue.id).populate(
            "authorId"
          );
          return comment.authorId;
        } catch (err) {
          console.log("Error populating the author.", err);
        }
      },
    },
  }),
});

module.exports = CommentType;
