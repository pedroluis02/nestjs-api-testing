import { Controller, Get, Inject } from '@nestjs/common';
import { ProjectType } from './../../domain/model/project-type.model';
import {
  IProjectTypeService,
  PROJECT_TYPE_SERVICE,
} from './../../domain/service/project-type.interface';

@Controller('project-types')
export class ProjecTypeController {
  constructor(
    @Inject(PROJECT_TYPE_SERVICE)
    private readonly service: IProjectTypeService,
  ) {}

  @Get()
  getAll(): ProjectType[] {
    return this.service.getAll();
  }
}
