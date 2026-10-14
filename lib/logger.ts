const pino = require('pino');

export const logger = pino(
  process.env.NODE_ENV === 'production'
    ? {}
    : {
        transport: {
          target: 'pino-pretty',
        },
      }
);
