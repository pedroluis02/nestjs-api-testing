import { Test, TestingModule } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { setupInMemoryDb } from './in-memory-db';
import { RelationalDatabaseModule } from './../relational-dabatase.module';
import { ProjectTypeEntity } from './../entity/project-type.entity';
import { ProjectEntity } from './../entity/project.entity';
import { UserEntity } from './../entity/user.entity';

export async function buildTestingModule(): Promise<TestingModule> {
  const dataSource = await setupInMemoryDb([
    UserEntity,
    ProjectTypeEntity,
    ProjectEntity,
  ]);

  return Test.createTestingModule({
    imports: [RelationalDatabaseModule],
  })
    .overrideProvider(DataSource)
    .useValue(dataSource)
    .compile();
}
