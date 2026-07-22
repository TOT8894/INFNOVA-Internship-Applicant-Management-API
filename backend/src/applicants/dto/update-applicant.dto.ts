import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import {
  ApplicantStatus,
  InternshipTrack,
} from 'src/generated/prisma/enums';

export class UpdateApplicantDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsEnum(InternshipTrack)
  track?: InternshipTrack;

  @IsOptional()
  @IsEnum(ApplicantStatus)
  status?: ApplicantStatus;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  notes?: string;
}