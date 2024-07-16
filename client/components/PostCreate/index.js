import React from "react";
import { useForm } from "react-hook-form";

function PostCreate() {
  const { register, handleSubmit, reset } = useForm();

  return (
    <div>
      PostCreate
      <form>
        <input {...register("title")} />
        <input {...register("")} />
      </form>
    </div>
  );
}

export default PostCreate;
