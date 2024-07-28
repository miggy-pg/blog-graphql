import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

import Button from "../Button";
import { GET_POST } from "../../queries/queryPost";

const ADD_COMMENT = gql`
  mutation AddCommentToPost($postId: ID!, $authorId: ID!, $content: String) {
    addCommentToPost(postId: $postId, authorId: $authorId, content: $content) {
      id
      content
    }
  }
`;

const ADD_LIKE_TO_COMMENT = gql`
  mutation AddLikeToComment($commentId: ID!) {
    addLikeToComment(commentId: $commentId) {
      author {
        id
        name
      }
      id
      likes
      content
    }
  }
`;

function PostDetail() {
  const methods = useForm();
  const postId = window.location.href.split("/")[4];
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { postId },
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT);
  const [addLikeCommentMutation] = useMutation(ADD_LIKE_TO_COMMENT);

  const onSubmit = (formData, ev) => {
    try {
      addCommentMutation({
        variables: {
          postId: postId,
          authorId: `${process.env.USER_ID}`,
          content: formData.content,
        },
        update: (cache, { data: { addCommentToPost } }) => {
          const { post } = cache.readQuery({
            query: GET_POST,
            variables: {
              postId,
            },
          });
          cache.writeQuery({
            query: GET_POST,
            data: {
              post: {
                ...post,
                comments: [...post.comments, addCommentToPost],
              },
            },
            variables: { postId },
          });
        },
        onCompleted: () => {
          methods.reset();
        },
      });
    } catch (err) {
      console.log("Failed adding new comment to post. ", err);
    }
  };

  const handleAddLikeToComment = (commentId) => {
    try {
      const { post } = data;
      // Find the comment in the current post data
      const likedCommentIndex = post.comments.findIndex(
        (comment) => comment.id === commentId
      );
      if (likedCommentIndex === -1) return;
      const currentLikes = post.comments[likedCommentIndex].likes;

      addLikeCommentMutation({
        variables: { commentId },
        update: (cache, { data: { addLikeToComment } }) => {
          const { post } = cache.readQuery({
            query: GET_POST,
            variables: { postId },
          });

          const likedCommentIndex = post.comments.findIndex(
            (comment) => comment.id == commentId
          );
          // Ensure the comment is found
          if (likedCommentIndex === -1) return;

          const newComments = post?.comments.map((comment, index) =>
            index === likedCommentIndex
              ? { ...comment, liked: addLikeToComment }
              : comment
          );

          cache.writeQuery({
            query: GET_POST,
            data: {
              post: {
                ...post,
                comments: newComments,
              },
            },
            variables: {
              postId,
            },
          });
        },
        optimisticResponse: {
          __typename: "Mutation",
          addLikeToComment: {
            __typename: "CommentType",
            id: commentId,
            likes: currentLikes + 1,
            content: post.comments[likedCommentIndex].content,
            author: post.comments[likedCommentIndex].author,
          },
        },
      });
    } catch (err) {
      console.log("Failed adding new like to comment. ", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  // 'post' data only exist after loading which is why this line exist after 'loading' is done
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
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CommentInput />
          <Button label="Submit" type="submit" />
        </form>
      </FormProvider>
      <div className="comments-section">
        {post.comments.map((comment, index) => (
          <div key={index} className="comment">
            <p className="comment-author">{comment.author.name}</p>
            <p className="comment-text">{comment.content}</p>
            <span>
              {comment?.likes}
              <button
                className="comment-btn"
                onClick={() => handleAddLikeToComment(comment.id)}
              >
                Like
              </button>
              <button className="comment-btn">Delete</button>
            </span>
          </div>
        ))}
      </div>
      <Button label="Back" type="navigate" to="/" />
    </div>
  );
}

function CommentInput() {
  const { register } = useFormContext();

  return <input {...register("content")} />;
}

export default PostDetail;
