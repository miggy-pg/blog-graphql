import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";

import PostDetail from "./components/PostDetail";
import PostList from "./components/PostList";
import CreatePost from "./components/CreatePost";
import App from "./App";
import "./style/style.css";

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
