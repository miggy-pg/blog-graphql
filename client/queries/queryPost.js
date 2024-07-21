import { gql } from "@apollo/client";

const getPosts = gql`
  query GetPosts {
    posts {
      id
      title
      content
    }
  }
`;

const getPost = gql`
  query getPost($postId: ID!) {
    post(postId: $postId) {
      title
      comments
    }
  }
`;

export { getPosts };
