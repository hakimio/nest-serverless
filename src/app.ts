import {NestFactory} from '@nestjs/core';
import {Logger, ValidationPipe} from '@nestjs/common';
import {AppModule} from './app.module';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as fastify from 'fastify';

export interface NestServer {
    nestApp: NestFastifyApplication;
    fastifyServer: fastify.FastifyInstance;
}

export async function bootstrap(): Promise<NestServer> {
    const serverOptions: fastify.ServerOptionsAsHttp = {
            logger: true,
        },
        fastifyServer: fastify.FastifyInstance = fastify(serverOptions),
        env = process.env,
        isLocal = !env.AWS_EXECUTION_ENV && !env.IS_LOCAL && !env.IS_OFFLINE,
        nestApp = await NestFactory.create<NestFastifyApplication>(
            AppModule,
            new FastifyAdapter(fastifyServer),
            {
                logger: isLocal ? new Logger() : console
            }
        );

    nestApp.useGlobalPipes(new ValidationPipe());

    if (!isLocal) {
        // Following are only needed when running in AWS lambda function
        await nestApp.init();
    }

    return {
        nestApp,
        fastifyServer
    };
}
