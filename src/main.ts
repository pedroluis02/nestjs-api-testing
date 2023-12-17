import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { setupSwagger } from './config/swagger';
import { ConfigService } from '@nestjs/config';

function getConfigPort(app: INestApplication): number {
  const config = app.get(ConfigService);
  return config.get<number>('port');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  const port = getConfigPort(app);
  await app.listen(port);
}

bootstrap();
