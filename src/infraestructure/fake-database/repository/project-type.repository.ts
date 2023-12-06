import { ProjectType } from './../../../domain/model/project-type.model';
import { ProyectTypeEntity } from './../entity/project-type.entity';
import { IProjectTypeRepository } from './../../../domain/repository/project-type.interface';

export class ProjectTypeReposiotry implements IProjectTypeRepository {
  private readonly types: ProyectTypeEntity[] = [
    { id: 1, name: 'Private' },
    { id: 2, name: 'Public' },
  ];

  findAlll(): ProjectType[] {
    return this.types.map((t) => ({ id: t.id, name: t.name }));
  }
}
