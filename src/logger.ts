import * as winston from 'winston';

export const logger = winston.createLogger({
    format: winston.format.printf(({message,}) => `${message}`),
    level: process.env.NODE_ENV === 'test'
        ? 'error'
        : 'info',
    transports: [new winston.transports.Console(),],
});
