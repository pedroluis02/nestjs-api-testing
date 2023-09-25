import { Module } from '@nestjs/common';
import { DomainModule } from './domain/domain.module';
import { ServiceModule } from './service/service.module';
import { FakeDatabaseModule } from './infraestructure/fake-database/database.module';
import { ApiModule } from './api/api.module'; 

@Module({
  imports: [
    ApiModule, 
    DomainModule, 
    ServiceModule, 
    FakeDatabaseModule,
  ], 
})
export class AppModule {}
