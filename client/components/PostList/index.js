import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { GET_POSTS } from "../../queries/queryPost";
import { useNavigate } from "react-router";
import Button from "../Button";
import { useSearchParams } from "react-router-dom";

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) {
      title
    }
  }
`;

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, data, refetch } = useQuery(GET_POSTS);

  const [deletePost] = useMutation(DELETE_POST, {
    onCompleted: () => refetch(),
  });

  const handleDelete = async (postId) => {
    try {
      deletePost({ variables: { postId } });
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  const handleViewPost = (postId) => {
    searchParams.set("postId", postId);
    setSearchParams(searchParams);

    navigate(`post/${postId}`);
  };

  const navigate = useNavigate();
  if (loading) return;
  return (
    <div>
      <div className="homepage">
        <h2>PostList</h2>
        <Button
          label="Create"
          type="button"
          action={() => navigate("/post/new")}
        />
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
              <Button
                label="View"
                type="button"
                action={() => handleViewPost(post.id)}
              />
              <Button
                label="Delete"
                type="button"
                action={() => handleDelete(post.id)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PostList;
