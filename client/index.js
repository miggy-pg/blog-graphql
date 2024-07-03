import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/client';

const client = new ApolloClient({})

const Root = () => {
  return (
    <ApolloProvider store={store}>
        <div>Blog</div>
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
