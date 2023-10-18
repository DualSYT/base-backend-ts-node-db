import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import TransportStream from 'winston-transport';
import {ENV} from '../config/envConfig'

import {LoggingWinston} from '@google-cloud/logging-winston'
  

const loggingWinston = new LoggingWinston(
  {
   /* projectId: 'gpc-dev-mesos-cl',
    keyFilename: './gpc-dev-mesos-cl-a0fac0745b1d.json',
  */
    labels: {
        name: 'api-recaudacion-sms-db',
        version: '1.0.0'
    }
    }
);

const customLevels = {
    levels: {
        trace: 6,
        debug: 5,
        info: 4,
        http: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        http: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};

const formatterConsole = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),

    winston.format.printf((info) => {
        const { timestamp, level, message, ...meta } = info;

        return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 1) : ''
            }`;
    }),
);

const formatterFile = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),

    winston.format.printf((info) => {
        const { timestamp, level, message, ...meta } = info;
        return `${timestamp}|${ENV.NAME || 'api'}|${level}|${message}|${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
            }`;
    }),
);

class logger {
    private logger: winston.Logger;
    defaultMeta!: { component: 'user-service'; };
    constructor() {
        const transportFileConsole = new winston.transports.File({
            filename: 'logs/server.log',
            level: ENV.LOGGER_LEVEL || 'trace',
            format: formatterFile,
        });

        const transportFile: DailyRotateFile = new DailyRotateFile({
            filename: 'logs/server-%DATE%.log',
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d',
            level: ENV.LOGGER_LEVEL || 'http',
            format: formatterFile,
        });

        const transportConsole = new winston.transports.Console({
            format: formatterConsole,
        });

        const transportOption = () => {
            let transport: Array<TransportStream>;
            switch (ENV.LOGGER_TRANSPORT) {
                case 'console':
                    transport = [transportConsole, loggingWinston]
                    break;
                case 'file':
                    transport = [transportFile]
                    break;
                case 'file_console':
                    transport = [transportFileConsole, transportConsole, loggingWinston]
                    break;
                case 'GCP':
                    transport = [ loggingWinston]
                    break;
                default:
                    transport = [transportConsole, loggingWinston]
                    break;
            }

            return transport;
        }

        this.logger = winston.createLogger({
            level: ENV.LOGGER_LEVEL || 'trace',
            levels: customLevels.levels,
            transports: transportOption()
        });

        winston.addColors(customLevels.colors);
    }

    trace(msg: any, meta?: any) {
        this.logger.log('trace', msg, meta);
    }

    debug(msg: any, meta?: any) {
        this.logger.debug(msg, meta);
    }

    info(msg: any, meta?: any) {
        this.logger.info(msg, meta);
    }

    http(msg: any, meta?: any) {
        this.logger.http(msg, meta);
    }

    warn(msg: any, meta?: any) {
        this.logger.warn(msg, meta);
    }

    error(msg: any, meta?: any) {
        this.logger.error(msg, meta);
    }

    fatal(msg: any, meta?: any) {
        this.logger.log('fatal', msg, meta);
    }
}

export const Logger = new logger();
