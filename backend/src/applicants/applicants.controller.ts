import { Controller, Get, Post, Put, Delete, Query, Param, Body } from '@nestjs/common';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
@Controller('applicants')
export class ApplicantsController {
    constructor(private readonly applicantService:ApplicantsService){}
        
    @Get("all")
    getallApplicant(){
    return this.applicantService.getallApplicant()
    }

    @Get()
    getApplicant(
        @Query('name') name:string,
        @Query('email') email:string,
        @Query('id')id:number
    ){
        return this.applicantService.getApplicantByQuery(name,email,id)
   }
   
    @Post()
    createApplicant(@Body() createApplicantDto:CreateApplicantDto){
        return this.applicantService.createApplicant(createApplicantDto) 
    } 

    @Get(":id")
    getApplicantById(@Param('id') id:number){
      return this.applicantService.getApplicantById(id)
    }

    @Delete("/:id")
    deleteApplicant(@Param('id') id:number){
       return  this.applicantService.deleteApplicant(id)
    }
    @Put("/:id")
    updateApplicant(@Param('id')id:number,@Body() updateApplicantDto:UpdateApplicantDto){
       return this.applicantService.updateApplicant(id,updateApplicantDto)
    }
}

