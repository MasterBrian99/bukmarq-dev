import { DocumentBuilder, SwaggerDocumentOptions } from '@nestjs/swagger';

export const swaggerPath = 'swagger';

export const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle(' Api Documentation')
  .setDescription(
    '\n\n## Congratulations! Your application is ready.\n  \nPlease note that most endpoints are secured with JWT Bearer authentication.\nBy default',
  )
  .setVersion('0.0.1')
  .addBearerAuth({ in: 'header', type: 'http' })
  .build();

export const swaggerSetupOptions: SwaggerDocumentOptions = {
  operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  ignoreGlobalPrefix: false,
};
console.info(`Documentation: http://localhost:${process.env.PORT}/swagger`);
