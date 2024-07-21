import React from "react";
import { useSearchParams } from "react-router-dom";

function PostDetail() {
  const [searchParams] = useSearchParams();

  return (
    <div>
      <h4>Title</h4>
    </div>
  );
}

export default PostDetail;
