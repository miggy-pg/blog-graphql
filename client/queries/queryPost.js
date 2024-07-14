import { gql } from "@apollo/client";

const getPosts = gql `
  { 
    posts {
      title
    }
  }
`

export {
 getPosts 
}