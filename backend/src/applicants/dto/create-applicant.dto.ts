import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { InternshipTrack } from 'src/generated/prisma/enums';

export class CreateApplicantDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  name!: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  email!: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(10)
  phone?: string;

  @ApiProperty({
    enum: InternshipTrack,
  })
  @IsEnum(InternshipTrack)
  track!: InternshipTrack;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}