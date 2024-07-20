import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

function PostCreate() {
  const methods = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      PostCreate
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <NestedInput />
          <input type="submit" />
        </form>
      </FormProvider>
    </div>
  );
}

function NestedInput() {
  const { register } = useFormContext();
  return <input {...register} />;
}

export default PostCreate;
