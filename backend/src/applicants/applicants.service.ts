import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { ApplicantStatus, InternshipTrack } from 'src/generated/prisma/enums';

@Injectable()
export class ApplicantsService {
    constructor(
        private readonly prismaService:PrismaService
    ){}



    async getallApplicant(){
        return this.prismaService.applicant.findMany({
            where:{
                deletedAt:null
            }
        })
    }

    
    async getApplicantByQuery(
            name?:string,
            email?:string,
            id?:string,
            track?:InternshipTrack,
            status?:ApplicantStatus,
        ){ 
        let applicant = await this.prismaService.applicant.findMany({
            where:{
                deletedAt:null,
                ...(name&&{
                    name:{
                        contains:name
                    }
                }),
                ...(email&&{
                    email:{
                        contains:email
                    }
                }),
                ...(id&&{
                    id:Number(id)
                }),
                ...(track&&{
                    track
                }),
                ...(status&&{
                    status
                })
            }
        })
        if(applicant.length==0){
            throw new NotFoundException("user not found")
        }
        return applicant
    }



    async getApplicantById(id:string){
        const applicant = await this.prismaService.applicant.findFirst({
            where:{
               id:Number(id),
               deletedAt:null
            }
        })
        if(!applicant){
            throw new NotFoundException("user not found")

        }
        return applicant
    }



    async createApplicant(createApplicantDto:CreateApplicantDto){
        const existingUser = await this.prismaService.applicant.findUnique({
            where:{
                email:createApplicantDto.email,
                deletedAt:null
            }
        })

        if(existingUser){
            throw new ConflictException("user already exist")
        }

        return this.prismaService.applicant.create({
            data:createApplicantDto,
            }
        )
                    
    }
    


    async updateApplicant(id:string,updateApplicantDto:UpdateApplicantDto){

        await this.getApplicantById(id)
        return  this.prismaService.applicant.update({
            where:{id:Number(id)},
            data:updateApplicantDto,
        })
        
    }



    async deleteApplicant(id:string){
        await this.getApplicantById(id)
        return  this.prismaService.applicant.update({
            where:{id:Number(id)},
            data:{deletedAt:new Date()},
        })
    }


    async  updateStatus(id:string,updateStatusDto:UpdateStatusDto){
        const applicant = await this.getApplicantById(id)
        if(
            applicant.status==="REJECTED" && 
            updateStatusDto.status==="ACCEPTED"){
            throw new BadRequestException('Applicant cannot move directly from Rejected to Accepted')
        }

        return this.prismaService.applicant.update({
            where:{
                id:Number(id)
            },
            data:{status:updateStatusDto.status}
        })
    }


    async updateNotes(id:string,updateNotesDto:UpdateNotesDto){
        await this.getApplicantById(id)
        return this.prismaService.applicant.update({
            where:{
                id:Number(id)
            },
            data:{notes:updateNotesDto.notes}
        })
    }
}
