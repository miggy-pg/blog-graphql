const mongoose = require('mongoose');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString
} = graphql;
const User = mongoose.model('user');

const UserType = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: {type: GraphQLID},
    username: {type: GraphQLString},
    email: {type: GraphQLString},
    password: {type: GraphQLString}
  })
})

module.exports = UserType;
