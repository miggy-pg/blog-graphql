const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString
} = graphql;
const GraphQLDate = require('graphql-date')
const User = mongoose.model('user');

const CommentType = new GraphQLObjectType({
  name:  'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    post: { type: GraphQLInt },
    content: { type: GraphQLString },
    createdAt: {type: GraphQLDate},
    author: {
      type: require('./user'),
      resolve(parentValue) {
        return User.findById(parentValue).populate('user')
          .then(user => {
            console.log("user: ", user)
            return user.name
          });
      }
    }
  })
});

module.exports = CommentType;
