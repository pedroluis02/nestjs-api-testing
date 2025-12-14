import { Injectable } from '@nestjs/common';
import { FDbProjectTypeEntity } from './../entity/project-type.entity';

@Injectable()
export class FDbProjectTypeDao {
  private readonly types: FDbProjectTypeEntity[] = [
    { _id: '1', id: 1, name: 'Private', description: '' },
    { _id: '2', id: 2, name: 'Public', description: '' },
  ];

  findAll(): FDbProjectTypeEntity[] {
    return this.types;
  }

  findOne(id: number): FDbProjectTypeEntity | null {
    const entity = this.types.find((t, index) => t.id === id);
    return entity;
  }

  findIndex(id: number): number {
    return this.types.findIndex((t) => t.id === id);
  }

  insert(entity: FDbProjectTypeEntity): FDbProjectTypeEntity {
    const newId = this.types.length + 1;
    entity._id = newId.toString();
    entity.id = newId;

    this.types.push(entity);

    return entity;
  }

  update(entity: Partial<FDbProjectTypeEntity>): FDbProjectTypeEntity | null {
    const storedEntity = this.findOne(entity.id);
    if (storedEntity) {
      storedEntity.name = entity.name || storedEntity.name;
      storedEntity.description = entity.description || storedEntity.description;

      return storedEntity;
    }

    return null;
  }

  delete(id: number) {
    const index = this.findIndex(id);
    if (index > -1) {
      this.types.splice(index, 1);
      return true;
    }

    return false;
  }
}
