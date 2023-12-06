import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProjectType } from './../../domain/model/project-type.model';
import {
  IProjectTypeService,
  PROJECT_TYPE_SERVICE,
} from './../../domain/service/project-type.interface';
import {
  CreateProjectTypeDto,
  UpdateProjectType,
} from './../dto/project-type-dto';

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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateProjectTypeDto): ProjectType {
    const model: ProjectType = {
      id: 0,
      name: body.name,
      description: body.description || '',
    };

    return this.service.create(model);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProjectType,
  ) {
    const model: Partial<ProjectType> = {
      id: id,
      name: body.name,
      description: body.description,
    };
    this.service.update(model);

    return 'Resource updated';
  }
}
