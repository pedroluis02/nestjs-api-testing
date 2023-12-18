import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProjectType } from './../../domain/model/project-type.model';
import { IProjectTypeService } from './../../domain/service/project-type.interface';
import {
  CreateProjectTypeDto,
  UpdateProjectType,
} from './../dto/project-type-dto';
import { JWTAuthGuard } from './../guard/jwt-auth.guard';

@Controller('project-types')
export class ProjecTypeController {
  constructor(private readonly service: IProjectTypeService) {}

  @Get()
  getAll(): Promise<ProjectType[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number): Promise<ProjectType> {
    const model = await this.service.getOne(id);
    if (!model) {
      throw new NotFoundException();
    }

    return model;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JWTAuthGuard)
  create(@Body() body: CreateProjectTypeDto): Promise<ProjectType> {
    const model: ProjectType = {
      id: 0,
      name: body.name,
      description: body.description || '',
    };

    return this.service.create(model);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JWTAuthGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProjectType,
  ): Promise<ProjectType> {
    const model: Partial<ProjectType> = {
      id: id,
      name: body.name,
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
  @UseGuards(JWTAuthGuard)
  delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.service.delete(id);
  }
}
