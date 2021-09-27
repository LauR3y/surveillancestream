import { config as dotenv } from 'dotenv';

// log errors to stderr
process.on('uncaughtException', (error: Error, origin: 'uncaughtException' | 'unhandledRejection') => {
  console.error(error && error.stack ? error.stack : error, origin);
});
process.on('unhandledRejection', (reason: Record<string, unknown> | null | undefined, promise: Promise<unknown>) => {
  console.error(reason, promise);
});

// load environment variables, fallback to .env
dotenv();
