import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';
import { ConfigService } from '@nestjs/config';

function currentPort(app: INestApplication) {
  const config = app.get(ConfigService);
  return config.get('port');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  const port = currentPort(app);
  await app.listen(port);
}

bootstrap();
