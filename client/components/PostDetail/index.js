import React from "react";
import { GET_POST } from "../../queries/queryPost";
import { gql, useMutation, useQuery } from "@apollo/client";
import Button from "../Button";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

const ADD_COMMENT = gql`
  mutation AddCommentToPost($postId: ID!, $authorId: ID!, $content: String) {
    addCommentToPost(postId: $postId, authorId: $authorId, content: $content) {
      content
    }
  }
`;

function PostDetail() {
  const methods = useForm();
  const postId = window.location.href.split("/")[4];
  const { loading, error, data, refetch } = useQuery(GET_POST, {
    variables: { postId },
  });
  const [
    handleAddComment,
    { loading: addCommentLoading, error: addCommentErr, data: comments },
  ] = useMutation(ADD_COMMENT);

  const onSubmit = (data, ev) => {
    handleAddComment({
      variables: {
        postId: postId,
        authorId: `${process.env.USER_ID}`,
        content: data.content,
      },
    });
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
        {post.comments.map((comment) => (
          <div key={comment.id} className="comment">
            {console.log("comment: ", process.env.USER_ID)}
            <p className="comment-author">{comment.author.name}</p>
            <p className="comment-text">{comment.content}</p>
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
