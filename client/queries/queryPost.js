import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      likes
      content
    }
  }
`;

const GET_POST = gql`
  query getPost($postId: ID!) {
    post(postId: $postId) {
      id
      title
      content
      comments {
        id
        likes
        content
        author {
          id
          name
        }
      }
      authorId {
        id
        username
      }
    }
  }
`;

export { GET_POSTS, GET_POST };
