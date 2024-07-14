import React from "react";
import { useQuery } from "@apollo/client"
import { getPosts } from "../../queries/queryPost";


function PostList(){
  const { loading, error, data } = useQuery(getPosts);
  console.log("data: ", data);
  return <div>PostList</div>
}

export default PostList