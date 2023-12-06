import { ProjectType } from './../../../domain/model/project-type.model';
import { ProjectTypeEntity } from './../entity/project-type.entity';
import { IProjectTypeRepository } from './../../../domain/repository/project-type.interface';

export class ProjectTypeRepository implements IProjectTypeRepository {
  private readonly types: ProjectTypeEntity[] = [
    { id: 1, name: 'Private', description: '' },
    { id: 2, name: 'Public', description: '' },
  ];

  findAlll(): ProjectType[] {
    return this.types.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
    }));
  }

  findOneBy(id: number): ProjectType | undefined {
    const entity = this.findEntityBy(id);
    if (entity) {
      return {
        id: entity.id,
        name: entity.name,
        description: entity.description,
      };
    }

    return null;
  }

  insert(model: ProjectType): ProjectType {
    const newId = this.types.length + 1;
    const entity: ProjectTypeEntity = {
      id: newId,
      name: model.name,
      description: model.description,
    };
    this.types.push(entity);

    model.id = newId;
    return model;
  }

  update(model: Partial<ProjectType>): void {
    const entity = this.findEntityBy(model.id);
    if (entity) {
      entity.name = model.name || entity.name;
      entity.description = model.description || entity.description;
    }
  }

  private findEntityBy(id: number): ProjectTypeEntity | undefined {
    return this.types.find((t) => t.id === id);
  }
}
