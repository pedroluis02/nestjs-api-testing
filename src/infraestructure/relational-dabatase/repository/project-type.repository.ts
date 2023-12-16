import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProjectTypeRepository } from './../../../domain/repository/project-type.interface';
import { ProjectTypeEntity } from './../entity/project-type.entity';
import { ProjectType } from './../../../domain/model/project-type.model';
import { ProjectTypeEntityMapper } from './../mapper/project-type.mapper';

@Injectable()
export class ProjectTypeRepository implements IProjectTypeRepository {
  constructor(
    @InjectRepository(ProjectTypeEntity)
    private readonly dataSource: Repository<ProjectTypeEntity>,
    private readonly mapper: ProjectTypeEntityMapper,
  ) {}

  async findAll(): Promise<ProjectType[]> {
    const entities = await this.dataSource.find();
    return entities.map(this.mapper.toDomain);
  }

  async findOne(id: number): Promise<ProjectType | null> {
    const entity = await this.dataSource.findOneBy({ id: id });
    if (entity) {
      return this.mapper.toDomain(entity);
    }

    return null;
  }

  async save(model: ProjectType): Promise<ProjectType> {
    const entity = this.dataSource.create(this.mapper.toCreate(model));
    const stored = await this.dataSource.save(entity);

    return this.mapper.toDomain(stored);
  }

  async update(model: Partial<ProjectType>): Promise<ProjectType | null> {
    const entity = this.mapper.toUpdate(model);

    const preloaded = await this.dataSource.preload(entity);
    if (preloaded) {
      const updated = await this.dataSource.save(preloaded);
      return this.mapper.toDomain(updated);
    }

    return null;
  }

  async delete(id: number): Promise<boolean> {
    const entity = await this.dataSource.findOneBy({ id: id });
    if (entity) {
      const result = await this.dataSource.delete(entity);
      return result.affected > 0;
    }

    return false;
  }
}
