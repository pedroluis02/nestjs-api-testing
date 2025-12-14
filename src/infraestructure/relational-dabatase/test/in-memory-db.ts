import { randomUUID } from 'node:crypto';
import { DataType, newDb } from 'pg-mem';
import { DataSource, EntitySchema, MixedList } from 'typeorm';

export async function setupInMemoryDb(
  entities: MixedList<Function | string | EntitySchema> = [],
): Promise<DataSource> {
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    name: 'current_database',
    implementation: () => 'nestjs-api-db',
  });

  db.public.registerFunction({
    name: 'version',
    implementation: () => '1',
  });

  db.registerExtension('uuid-ossp', (schema) => {
    schema.registerFunction({
      name: 'uuid_generate_v4',
      returns: DataType.uuid,
      implementation: randomUUID,
      impure: true,
    });
  });

  const ds: DataSource = await db.adapters.createTypeormDataSource({
    type: 'postgres',
    entities: entities,
  });

  await ds.initialize();
  await ds.synchronize();

  return ds;
}
