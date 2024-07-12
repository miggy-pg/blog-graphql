import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import PostList from "./components/PostList"

const httpLink = new createHttpLink({
    uri: "http://localhost:4000/graphql"
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <PostList/>
    </ApolloProvider> 
  )
};

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)


