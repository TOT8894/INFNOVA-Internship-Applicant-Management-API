import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class UpdateNotesDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}