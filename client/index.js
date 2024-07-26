import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  defaultDataIdFromObject,
} from "@apollo/client";
import { createHttpLink } from "@apollo/client";

import PostDetail from "./components/PostDetail";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import App from "./App";
import "./style/style.css";

const httpLink = new createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    dataIdFromObject(responseObject) {
      console.log("responseObject: ", responseObject);
      switch (responseObject.__typename) {
        case "CommentType":
          return `CommentType:${responseObject.id}`;
        case "UserType":
          return `UserType:${responseObject.id}`;
        case "PostType":
          return `PostType:${responseObject.id}`;
        default:
          return defaultDataIdFromObject(responseObject);
      }
      // return responseObject.id;
    },
  }),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<PostList />} />
            <Route path="post/new" element={<CreatePost />} />
            <Route path="post/:postId" element={<PostDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
