const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const LyricType = require('./user');
const User = mongoose.model('user');

const PostType = new GraphQLObjectType({
  name:  'PostType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    // comments: {
    //   type: new GraphQLList(LyricType),
    //   resolve(parentValue) {
    //     return Song.findLyrics(parentValue.id);
    //   }
    // },
    // author: {
    //   type: new GraphQLList(LyricType),
    //   resolve(parentValue) {
    //     return Song.findLyrics(parentValue.id);
    //   }
    // }
  })
});

module.exports = PostType;
