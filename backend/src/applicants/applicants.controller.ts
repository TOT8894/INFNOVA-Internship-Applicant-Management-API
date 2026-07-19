import { 
    Controller, 
    Get, 
    Post,  
    Delete, 
    Query, 
    Param, 
    Body, 
    Patch, 
} from '@nestjs/common';

import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { ApplicantStatus, InternshipTrack } from 'src/generated/prisma/enums';


@Controller('applicants')
export class ApplicantsController {
    constructor(
        private readonly applicantService:ApplicantsService
    ){}
    
    
    @Get("all")
    getallApplicant(){
    return this.applicantService.getallApplicant()
    }


    @Get()
    getApplicantByQuery(
        @Query('name') name?:string,
        @Query('email') email?:string,
        @Query('id') id?:string,
        @Query('status') status?:InternshipTrack,
        @Query('track') track?:ApplicantStatus,
    ){
        return this.applicantService.getApplicantByQuery(name,email,id,status,track)
    }
   

    @Post()
    createApplicant(
        @Body() createApplicantDto:CreateApplicantDto
    ){
        return this.applicantService.createApplicant(createApplicantDto) 
    } 


    @Get(":id")
    getApplicantById(
        @Param('id') id:string
    ){
      return this.applicantService.getApplicantById(id)
    }


    @Delete("/:id")
    deleteApplicant(
        @Param('id') id:string
    ){
       return  this.applicantService.deleteApplicant(id)
    }


    @Patch("/:id")
    updateApplicant(
        @Param('id') id:string,
        @Body() updateApplicantDto:UpdateApplicantDto
    ){
       return this.applicantService.updateApplicant(id,updateApplicantDto)
    }


    @Patch(':id/status')
    updateStatus(
        @Param('id') id: string,
        @Body() updateStatusDto: UpdateStatusDto,
    ) {
        return this.applicantService.updateStatus(
        id,
        updateStatusDto,
        );
    }


    @Patch(':id/notes')
    updateNotes(
        @Param('id') id: string,
        @Body() updateNotesDto: UpdateNotesDto,
    ) {
        return this.applicantService.updateNotes(
        id,
        updateNotesDto,
        );
    }
}

