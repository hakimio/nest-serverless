import * as fs from 'fs';
import {SwaggerModule, DocumentBuilder} from '@nestjs/swagger';

import {bootstrap} from './app';

const port = process.env.LISTEN_PORT || 3000;

const swaggerBaseConfig = new DocumentBuilder()
    .setTitle('sample-api')
    .setDescription('api')
    .setVersion('1.0')
    .setSchemes('https')
    .build();

async function startLocal() {
  const nestServer = await bootstrap();
  nestServer.nestApp.enableCors();

  const doc = SwaggerModule.createDocument(nestServer.nestApp, swaggerBaseConfig);
  fs.writeFileSync(
      __dirname + '/../docs/openAPI/openAPI.json',
      JSON.stringify(doc, null, 2)
  );

  SwaggerModule.setup('docs', nestServer.nestApp, doc);

  await nestServer.nestApp.listen(+port);
}

startLocal();
