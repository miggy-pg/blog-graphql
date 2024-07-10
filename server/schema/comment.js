const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
} = graphql;
const GraphQLDate = require('graphql-date')
const User = mongoose.model('user');
const UserType = require('./user')

const CommentType = new GraphQLObjectType({
  name:  'CommentType',
  fields: () => ({
    id: { type: GraphQLID },
    postId: { type: GraphQLInt},
    content: { type: GraphQLString },
    createdAt: {type: GraphQLDate},
    author: {
      type: UserType,
      resolve(parentValue) {
        return User.findById(parentValue.authorId).populate('user')
          .then(user => {
            console.log("user: ", user)
            return user.name
          }).catch(err =>{
            console.log(err);
            return
          })
      }
    }
  })
});

module.exports = CommentType;
