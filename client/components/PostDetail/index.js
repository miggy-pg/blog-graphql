import React from "react";
import { GET_POST } from "../../queries/queryPost";
import { useQuery } from "@apollo/client";

function PostDetail() {
  const postId = window.location.href.split("/")[4];
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { postId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const { post } = data || {};
  console.log("post: ", post);
  return (
    <div className="post-card">
      <div className="post-header">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-author">{post.authorId.username}</p>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
      <div className="comments-section">
        {post.comments.map((post) => (
          <div className="comment">
            <p className="comment-author">Comment Author 1</p>
            <p className="comment-text">This is a comment.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostDetail;
