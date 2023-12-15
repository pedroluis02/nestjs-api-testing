import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import { ConfigModule } from '@nestjs/config';
import config from './config/general';

@Module({
  imports: [
    ApiModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class AppModule {}
