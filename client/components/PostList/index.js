import React from "react";
import { useQuery, gql } from "@apollo/client"

const query = gql`
  {
    users {
     id 
    }
  }
`;

function PostList(){
  const { loading, error, data } = useQuery(query);
  console.log("data: ", data);
  return <div>PostList</div>
}

export default PostList