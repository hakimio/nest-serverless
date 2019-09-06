import {
    Context,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    Handler
} from 'aws-lambda';
import {bootstrap, NestServer} from './app';
import * as awsLambdaFastify from 'aws-lambda-fastify';

let cachedServer: NestServer;

// noinspection JSUnusedGlobalSymbols
export const handler: Handler =
    async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
        if (!cachedServer) {
            cachedServer = await bootstrap();
        }
        const proxy = awsLambdaFastify(cachedServer.fastifyServer);

        return proxy(event, context);
    };
