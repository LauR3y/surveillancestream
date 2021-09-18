import { config as dotenv } from 'dotenv';

// log errors to stderr
const consolePrinter = (err: any) => {
  console.error(err && err.stack ? err.stack : err);
};
process.on('uncaughtException', consolePrinter);
process.on('unhandledRejection', consolePrinter);

// load environment variables, fallback to .env
dotenv();
