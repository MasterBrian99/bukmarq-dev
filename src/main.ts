import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import {
  swaggerDocumentOptions,
  swaggerPath,
  swaggerSetupOptions,
} from './setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  const document = SwaggerModule.createDocument(
    app,
    swaggerDocumentOptions,
    swaggerSetupOptions,
  );
  SwaggerModule.setup(swaggerPath, app, document);
  await app.listen(process.env.PORT);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
