import { Injectable } from '@nestjs/common';
import { ProjectTypeEntity } from './../entity/project-type.entity';

@Injectable()
export class ProjectTypeDao {
  private readonly types: ProjectTypeEntity[] = [
    { _id: '1', id: 1, name: 'Private', description: '' },
    { _id: '2', id: 2, name: 'Public', description: '' },
  ];

  findAll(): ProjectTypeEntity[] {
    return this.types;
  }

  findBy(id: number): ProjectTypeEntity | undefined {
    return this.types.find((t, index) => t.id === id);
  }

  findIndexBy(id: number): number {
    return this.types.findIndex((t) => t.id === id);
  }

  insert(entity: ProjectTypeEntity): ProjectTypeEntity {
    const newId = this.types.length + 1;
    entity._id = newId.toString();
    entity.id = newId;

    this.types.push(entity);

    return entity;
  }

  update(entity: Partial<ProjectTypeEntity>) {
    const storedEntity = this.findBy(entity.id);
    if (entity) {
      storedEntity.name = entity.name || storedEntity.name;
      storedEntity.description = entity.description || storedEntity.description;
    }
  }

  delete(id: number) {
    const index = this.findIndexBy(id);
    if (index > -1) {
      this.types.splice(index, 1);
    }
  }
}
