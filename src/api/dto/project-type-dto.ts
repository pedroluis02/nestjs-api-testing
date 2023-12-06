import { IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateProjectTypeDto {
  @IsString()
  @IsNotEmpty()
  @Min(3)
  @Max(50)
  name: string;

  @IsString()
  @IsOptional()
  @Max(100)
  description: string;
}
