import './bootstrap';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import minimist from 'minimist';

import schema from './graphql/schema';
import snapshot from './proxy/snapshot';

// Get port from args
const args = minimist(process.argv);

// Fallback to $PORT, and then to 3000
const port = parseInt(args.port) || parseInt(process.env.PORT || '3000') || 3000;

// Apollo GraphQL Server
const apollo = new ApolloServer({
  schema,
});

// without this, apollo will throw an error.
apollo.start().then(() => {
  // Express app
  const app = express();

  // proxy
  app.get('/proxy/snapshot', snapshot);

  // Link Apollo with Express, listen on /
  apollo.applyMiddleware({ app, path: '/' });

  // Start http server
  app.listen(port, () => {
    console.log(`[http] server listening on http://0.0.0.0:${port} - env:${process.env.NODE_ENV || 'default'}`);
  });
});
