import gql from "graphql-tag";

const ADD_LIKE_TO_POST = gql`
  mutation AddLikeToPost($postId: ID!) {
    addLikeToPost(postId: $postId) {
      id
      title
      content
      likes
    }
  }
`;

export { ADD_LIKE_TO_POST };
