import { PartialType } from '@nestjs/mapped-types';
import {
  IsDefined,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto {
  @IsInt()
  @IsDefined()
  projectTypeId: number;

  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @Length(3, 50)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  description: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
