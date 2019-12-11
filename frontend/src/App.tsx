import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import './App.css';
import List from './List'

const client = new ApolloClient({
  uri: process.env.REACT_APP_GQL_HOST,
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <List />
        </header>
      </div>
    </ApolloProvider>
  );
}

export default App;
