import { CreateApplicantDto } from "./create-applicant.dto";
import {PartialType} from "@nestjs/mapped-types"
export class UpdateApplicantDto extends PartialType(CreateApplicantDto){}