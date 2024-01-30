import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './api/api.module';
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
