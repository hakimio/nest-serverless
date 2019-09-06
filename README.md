# Simple NestJS Serverless example
Very simple serverless "Hello world" type example using NestJS, Serverless framework and AWS lambda function

## Installation

```bash
yarn install
```

## Running the app

Default Nest server in watch mode:
 ```bash
yarn run start:dev
```
If all goes well the app should be available on `3000` port:

http://localhost:3000

Serverless offline plugin:
```bash
yarn run start:sls
```

Testing the app with serverless `invoke local`:
```bash
yarn run test:sls
```

Packaging and deploying the app:
```bash
yarn run deploy
```

Only package: 
```bash
yarn run package
```

## Changed files
- app.ts
- main.ts
- lambda.ts

## Swagger
When running the app locally, swagger documentation is available under `/docs` path:

http://localhost:3000/docs
