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
import { ApplicantStatus, InternshipTrack } from 'src/generated/prisma/enums';

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
    
      // By default, Swagger may display @Query() parameters as required sop i use the following @ApiQuery()
        @ApiQuery({
            name: 'name',
            required: false,
            type: String,
        })
        @ApiQuery({
            name: 'email',
            required: false,
            type: String,
        })
        @ApiQuery({
            name: 'id',
            required: false,
            type: String,
        })
        @ApiQuery({
            name: 'status',
            required: false,
            enum: ApplicantStatus,
        })
        @ApiQuery({
            name: 'track',
            required: false,
            enum: InternshipTrack,
        }) 
        @ApiQuery({
            name: 'page',
            required: false,
            
        }) 
         @ApiQuery({
            name: 'limit',
            required: false,
            
        }) 
         @ApiQuery({
            name: 'sortBy',
            required: false,
            
        }) 
         @ApiQuery({
            name: 'sortOrder',
            required: false,
            
        }) 
    getApplicantByQuery(
        @Query('name') name?: string,
        @Query('email') email?: string,
        @Query('id') id?: string,
        @Query('status') status?: ApplicantStatus,
        @Query('track') track?: InternshipTrack,
        @Query('page') page?: string,
        @Query('limit') limit?: string,
        @Query('sortBy') sortBy?: string,
        @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    ) {
    return this.applicantService.getApplicantByQuery(
        name,
        email,
        id,
        track,
        status,
        page,
        limit,
        sortBy,
        sortOrder,
    );
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

