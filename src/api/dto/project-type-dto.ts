import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Length, MaxLength } from 'class-validator';

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
