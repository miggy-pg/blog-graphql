import {
  ApolloClient,
  InMemoryCache,
  defaultDataIdFromObject,
} from "@apollo/client";
import { createHttpLink } from "@apollo/client";

const httpLink = new createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({}),
});

export default client;
