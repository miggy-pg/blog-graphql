import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

const GET_POST = gql`
  query getPost($postId: ID!) {
    post(postId: $postId) {
      title
      content
      comments {
        content
      }
      authorId {
        username
      }
    }
  }
`;

export { GET_POSTS, GET_POST };
