import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import { GET_POSTS } from "../../queries/queryPost";
import Button from "../Button";

const ADD_POST = gql`
  mutation addPost($authorId: ID!, $title: String!, $content: String!) {
    addPost(authorId: $authorId, title: $title, content: $content) {
      title
    }
  }
`;

function PostCreate() {
  const methods = useForm();
  const navigate = useNavigate();
  const [handleAddPost, { data, loading, error, reset }] = useMutation(
    ADD_POST,
    {
      refetchQueries: [
        GET_POSTS, // DocumentNode object parsed with gql
        "posts", // Query name
      ],
    }
  );

  const onSubmit = (data, ev) => {
    ev.preventDefault();
    try {
      handleAddPost({
        variables: {
          authorId: `${import.meta.env.USER_ID}`,
          title: data.title,
          content: data.content,
        },
      });
      navigate("/");
    } catch (err) {
      console.log("Submission error:", err);
    }
  };

  return (
    <div className="post-create-card">
      <FormProvider {...methods}>
        <h2>Create Post</h2>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <CreateForm />
          {error && (
            <div>
              <p>Submission failed: {error.message}</p>
              <button type="button" onClick={() => reset()}>
                Dismiss
              </button>
            </div>
          )}
          <Button label="Back" type="navigate" to="/" />
        </form>
      </FormProvider>
    </div>
  );
}

function CreateForm() {
  const { register } = useFormContext();
  return (
    <>
      <input type="hidden" {...register("authorId")} />
      <label htmlFor="title">Title:</label>
      <input {...register("title")} />
      <label htmlFor="content">Content:</label>
      <input {...register("content")} />
      <Button label="Submit" type="submit" />
    </>
  );
}

export default PostCreate;
