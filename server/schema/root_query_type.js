const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const PostType = require('./post');
const UserType = require('./user');
const CommentType = require('./comment');
const Comment = mongoose.model('comment');
const Post = mongoose.model('post');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve() {
        return User.find({});
      }
    },
    user: {
      type: new GraphQLList(UserType),
      resolve(parentValue, {id}) {
        return User.findById({id});
      }
    },
    posts: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve() {
        return Post.findById({id});
      }
    },
    posts: {
      type: PostType,
      resolve() {
        return Post.find({});
      }
    },
    postsByAuthor: {
      type: new GraphQLList(PostType),
      args: { authorId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { authorId }) {
        return Post.findPostsByAuthor(authorId);
      }
    },
    postComments: {
      type: new GraphQLList(CommentType),
      args: { postId: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { postId }) {
        return Comment.findPostComments(postId);
      }
    },
    comments: {
      type: CommentType,
      resolve(){
        return Comment.find({})
      }
    }
  })
});

module.exports = RootQuery;
