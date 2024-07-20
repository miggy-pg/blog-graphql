import React from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { createHttpLink } from "@apollo/client";

import PostList from "./components/PostList";
import PostCreate from "./components/PostCreate";
import App from "./App";

const httpLink = new createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<PostList />} />
            <Route path="post/new" element={<PostCreate />} />
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
