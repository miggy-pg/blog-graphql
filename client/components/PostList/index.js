import React from "react";
import { useQuery, gql } from "@apollo/client"

const query = gql`
  query {
    post(id:"6690073a05ed072a96da7a14") {
      title 
    }
  }
`;

function PostList(){
  const { loading, error, data } = useQuery(query);
  console.log("data: ", data);
  return <div>PostList</div>
}

export default PostList