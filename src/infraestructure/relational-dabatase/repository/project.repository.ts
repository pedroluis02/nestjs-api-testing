import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProjectRepository } from './../../../domain/repository/project.interface';
import { Project } from './../../../domain/model/project.model';
import { ProjectEntity } from './../entity/project.entity';
import { ProjectEntityMapper } from './../mapper/project.mapper';
import { UserEntity } from './../entity/user.entity';

@Injectable()
export class ProjectRepository implements IProjectRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userDataSource: Repository<UserEntity>,
    @InjectRepository(ProjectEntity)
    private readonly dataSource: Repository<ProjectEntity>,
    private readonly mapper: ProjectEntityMapper,
  ) {}

  async findAll(): Promise<Project[]> {
    const entities = await this.dataSource.find();
    return entities.map(this.mapper.toDomain);
  }

  async findOne(id: string): Promise<Project | null> {
    const entity = await this.dataSource.findOneBy({ _id: id });
    if (entity) {
      return this.mapper.toDomain(entity);
    }

    return null;
  }

  async save(model: Project): Promise<Project> {
    const tmpEntity = this.mapper.toCreate(model);
    const storedUser = await this.userDataSource.findOneBy({
      _id: model.user.id,
    });
    tmpEntity.userId = storedUser.id;

    const entity = this.dataSource.create(tmpEntity);
    const stored = await this.dataSource.save(entity);

    const storedEntity = await this.dataSource.findOneBy({ id: stored.id });
    return this.mapper.toDomain(storedEntity);
  }

  async update(model: Partial<Project>): Promise<Project | null> {
    const entity = this.mapper.toUpdate(model);

    const tmpEntity = await this.dataSource
      .createQueryBuilder('project')
      .select(['project.id'])
      .where('project._id = :id', { id: model.id })
      .getOne();

    entity.id = tmpEntity.id;
    const preloaded = await this.dataSource.preload(entity);
    if (preloaded) {
      await this.dataSource.save(preloaded);
      return this.findOne(model.id);
    }

    return null;
  }

  async delete(id: string): Promise<boolean> {
    const entity = await this.dataSource.findOneBy({ _id: id });
    if (entity) {
      const result = await this.dataSource.delete(entity);
      return result.affected > 0;
    }

    return false;
  }
}
