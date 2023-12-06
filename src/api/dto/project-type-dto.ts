import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProjectTypeDto {
  @IsString()
  @Length(3, 50)
  name: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  description: string;
}

export class UpdateProjectType extends PartialType(CreateProjectTypeDto) {}
