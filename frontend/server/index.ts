import next from 'next'
import express from 'express';
import minimist from 'minimist';
import fs from 'fs';
import http from 'http';
import https from 'https';
import { config as dotenv } from 'dotenv';

// load environment variables, fallback to .env
dotenv();

// Get port from args
const args = minimist(process.argv);

// Fallback to $PORT, and then to 3000
const port = parseInt(args.port) || parseInt(process.env.PORT || '3001') || 3001;
const useSSL = process.env.SSL === 'true';
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
  const server = express();

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
      server
    );
  } else {
    webServer = http.createServer(server);
  }

  webServer.listen(port, () => {
    console.log(`> Ready on ${useSSL ? 'HTTPS' : 'HTTP'}://localhost:${port}`);
  });
});