import { ProjectType } from './../../../domain/model/project-type.model';
import { ProyectTypeEntity } from './../entity/project-type.entity';
import { IProjectTypeRepository } from './../../../domain/repository/project-type.interface';

export class ProjectTypeRepository implements IProjectTypeRepository {
  private readonly types: ProyectTypeEntity[] = [
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

  insert(model: ProjectType): ProjectType {
    const newId = this.types.length + 1;
    const entity: ProyectTypeEntity = {
      id: newId,
      name: model.name,
      description: model.description,
    };
    this.types.push(entity);

    model.id = newId;
    return model;
  }
}
