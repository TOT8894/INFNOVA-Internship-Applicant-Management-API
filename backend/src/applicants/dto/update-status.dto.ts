import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicantStatus } from '../../generated/prisma/client';

export class UpdateStatusDto {
  @ApiProperty({
    enum: ApplicantStatus,
  })
  @IsEnum(ApplicantStatus)
  status: ApplicantStatus;
}