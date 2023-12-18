import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { IProjectService } from './../../domain/service/project.interface';
import { Project } from './../../domain/model/project.model';
import { CreateProjectDto, UpdateProjectDto } from './../dto/project.dto';
import { JWTAuthGuard } from './../guard/jwt-auth.guard';

@Controller('projects')
@UseGuards(JWTAuthGuard)
export class ProjectController {
  constructor(private readonly service: IProjectService) {}

  @Get()
  getAll(): Promise<Project[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Project> {
    const model = await this.service.getOne(id);
    if (!model) {
      throw new NotFoundException();
    }

    return model;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateProjectDto): Promise<Project> {
    const model: Project = {
      id: '',
      type: { id: body.projectTypeId, name: null, description: null },
      user: null,
      name: body.name,
      title: body.title,
      description: body.description || '',
      createdAt: null,
    };

    return this.service.create(model);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateProjectDto,
  ): Promise<Project> {
    const model: Partial<Project> = {
      id: id,
      name: body.name,
      title: body.title,
      type: body.projectTypeId
        ? { id: body.projectTypeId, name: null, description: null }
        : null,
      description: body.description,
    };

    const updated = await this.service.update(model);
    if (!updated) {
      throw new NotFoundException();
    }

    return updated;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: string): Promise<boolean> {
    return this.service.delete(id);
  }
}
