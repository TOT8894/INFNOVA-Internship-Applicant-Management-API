import { 
    Controller, 
    Get, 
    Post,  
    Delete, 
    Query, 
    Param, 
    Body, 
    Patch, 
    UseGuards,
} from '@nestjs/common';

import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { ApplicantQueryDto } from './dto/applicant-query.dto';

@Controller('applicants')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
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
        @Query() query:ApplicantQueryDto
    ){
        return this.applicantService.getApplicantByQuery(query)
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

