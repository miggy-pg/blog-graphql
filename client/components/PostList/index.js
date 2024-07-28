import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";

import Button from "../Button";
import { ADD_LIKE_TO_POST } from "../../mutations/mutationPost";
import { GET_POSTS } from "../../queries/queryPost";

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      title
    }
  }
`;

function PostList() {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => refetch(),
  });

  const [addLikeToPostMutation] = useMutation(ADD_LIKE_TO_POST);

  const handleAddLikeToPost = (postId) => {
    try {
      const { posts } = data;

      const likedPost = posts.find((post) => post.id === postId);
      addLikeToPostMutation({
        variables: { postId },
        update: (cache, { data: { addLikeToPost } }) => {
          const { posts } = cache.readQuery({
            query: GET_POSTS,
          });

          const likedPostIndex = posts.findIndex((post) => post.id == postId);
          if (likedPostIndex === -1) return;

          const newPosts = posts.map((post, index) =>
            index === likedPostIndex
              ? { ...post, likes: addLikeToPost.likes }
              : post
          );

          cache.writeQuery({
            query: GET_POSTS,
            data: {
              posts: newPosts,
            },
          });
        },
        optimisticResponse: {
          __typename: "Mutation",
          addLikeToPost: {
            __typename: "PostType",
            id: postId,
            title: likedPost.title,
            content: likedPost.content,
            likes: likedPost?.likes + 1,
          },
        },
      });
    } catch (err) {
      console.log("Failed adding like to post. ", err);
    }
  };

  const handleDelete = async (postId) => {
    try {
      deletePost({ variables: { postId } });
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  if (loading) return;
  return (
    <div>
      <div className="homepage">
        <h2>PostList</h2>
        <Button label="Create" type="navigate" to="post/new" />
        <ul>
          {data?.posts.map((post, index) => (
            <li key={index} className="post-block">
              <span>
                <h5>{post.title}</h5>
              </span>
              <p>
                {post.content
                  ? post.content
                  : "Ullamco consectetur ut veniam qui pariatur aliqua ipsum esse."}
              </p>
              <p>{post.likes}</p>
              <Button
                label="Like"
                type="action"
                onClick={() => handleAddLikeToPost(post.id)}
              />
              <Button label="View" type="navigate" to={`post/${post.id}`} />
              <Button
                label="Delete"
                type="action"
                onClick={() => handleDelete(post.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostList;
