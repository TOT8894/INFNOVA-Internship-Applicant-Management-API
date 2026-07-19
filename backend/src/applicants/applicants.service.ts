import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';

@Injectable()
export class ApplicantsService {
    constructor(
        private readOnly prismaService:PrismaService
    ){}



    async getallApplicant(){
        return this.prismaService.applicant.findMany({
            where:{
                deletedAt:null
            }
        })
    }


    
    async getApplicantByQuery(name:string,email:string,id:string){ 
        let result = await this.prismaService.applicant.applicant()
        if(name){
            result =  result.findFirrst({
                where:{
                    name,
                    deletedAt:null
                }
            })
        }
        if(email){
            result =  result.findFirrst({
                where:{
                    email,
                    deletedAt:null
                }
            }) 
        }
        if(id){
           result =  result.findFirrst({
                where:{
                    id:Number(id),
                    deletedAt:null
                }
            }) 
        }
        if(!result){
            throw new NotFoundException("user not found")
        }
        return result
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
            message:"applicant created successfuly"}
        )
                    
    }
    


    async updateApplicant(id:string,updateApplicantDto:UpdateApplicantDto){

        await this.getApplicantById(id)
        return  this.prismaService.applicant.update({
            where:{id:Number(id)},
            data:updateApplicantDto,
            message:`${id} this Applicant updated`
        })
        
    }



    async deleteApplicant(id:string){
        await this.getApplicantById(id)
        return  this.prismaService.applicant.update({
            where:{id:Number(id)},
            data:{deletedAt:new Date()},
            message:`${id} this Applicant updated`
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
