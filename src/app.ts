import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';
import {AppModule} from './app.module';

import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import {Express} from 'express-serve-static-core';
import * as express from 'express';
import {eventContext} from 'aws-serverless-express/middleware';
import {Server} from 'http';
import {createServer} from 'aws-serverless-express';

export interface NestServer {
    nestApp: NestExpressApplication;
    expressServer: Server;
}

export async function bootstrap(): Promise<NestServer> {
    const expressApp: Express = express(),
        env = process.env,
        isLocal = !env.AWS_EXECUTION_ENV && !env.IS_LOCAL && !env.IS_OFFLINE,
        nestApp = await NestFactory.create<NestExpressApplication>(
            AppModule,
            new ExpressAdapter(expressApp),
            {
                logger: isLocal ? new Logger() : console
            }
        ),
        expressServer = createServer(expressApp);

    nestApp.useGlobalPipes(new ValidationPipe());

    if (!isLocal) {
        // Following are only needed when running in AWS lambda function
        nestApp.use(eventContext());
        await nestApp.init();
    }

    return {
        nestApp,
        expressServer
    };
}
