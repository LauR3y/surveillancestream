import './bootstrap';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import fs from 'fs';
import http from 'http';
import https from 'https';
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

const useSSL = !!process.env.SSL;

// without this, apollo will throw an error.
apollo.start().then(() => {
  // Express app
  const app = express();

  // proxy
  app.get('/proxy/snapshot', snapshot);

  // Link Apollo with Express, listen on /
  apollo.applyMiddleware({ app, path: '/' });

  // Start web server
  let webServer: http.Server | https.Server;

  if (useSSL) {
    if (!fs.existsSync('/ssl/fullchain.pem') || !fs.existsSync('/ssl/privkey.pem')) {
      throw Error('SSL files not found');
    }
    webServer = https.createServer(
      {
        key: fs.readFileSync('/ssl/privkey.pem'),
        cert: fs.readFileSync('/ssl/fullchain.pem'),
      },
      app
    );
  } else {
    webServer = http.createServer(app);
  }

  webServer.listen(port, () => {
    console.log(`${useSSL ? 'HTTPS' : 'HTTP'} Server running on port ${port}`);
  });
});
