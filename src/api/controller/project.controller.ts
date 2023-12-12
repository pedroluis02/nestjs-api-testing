import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IProjectService } from './../../domain/service/project.interface';
import { Project } from './../../domain/model/project.model';
import { CreateProjectDto, UpdateProjectDto } from './../dto/project.dto';

@Controller('projects')
export class ProjectController {
  constructor(private readonly service: IProjectService) {}

  @Get()
  getAll(): Project[] {
    return this.service.getAll();
  }

  @Get(':id')
  getOneBy(@Param('id') id: string): Project {
    return this.service.getOneBy(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateProjectDto): Project {
    const model: Project = {
      id: '',
      type: { id: body.projectTypeId, name: null, description: null },
      user: null,
      name: body.name,
      title: body.title,
      description: body.description || '',
      createdAt: new Date(),
    };

    return this.service.create(model);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    const model: Partial<Project> = {
      id: id,
      name: body.name,
      title: body.title,
      type: body.projectTypeId
        ? { id: body.projectTypeId, name: null, description: null }
        : null,
      description: body.description,
    };
    this.service.update(model);

    return 'Resource updated';
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string) {
    this.service.delete(id);

    return 'Resource deleted';
  }
}
