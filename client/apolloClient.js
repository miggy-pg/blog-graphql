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

export default client;
