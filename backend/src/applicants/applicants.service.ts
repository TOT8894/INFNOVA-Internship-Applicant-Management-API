import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateStatusDto } from './dto/update-status.dto';
import { UpdateNotesDto } from './dto/update-notes.dto';
import { ApplicantQueryDto } from './dto/applicant-query.dto';

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

    async getApplicantByQuery(query: ApplicantQueryDto) {
        const {
        name,
        email,
        status,
        track,
        page = 1,
        limit = 10,
        sortBy = 'createdAt',
        sortOrder = 'desc',
        } = query;

        const allowedSortFields = [
        'name',
        'email',
        'createdAt',
        'updatedAt',
        ];

        const safeSortBy = allowedSortFields.includes(sortBy)
        ? sortBy
        : 'createdAt';

        const safeSortOrder =
        sortOrder === 'asc' ? 'asc' : 'desc';

        const skip = (page - 1) * limit;

        const where = {
        deletedAt: null,

        ...(name && {
            name: {
            contains: name,
            },
        }),

        ...(email && {
            email: {
            contains: email,
            },
        }),

        ...(status && {
            status,
        }),

        ...(track && {
            track,
        }),
        };

        const [applicants, total] = await Promise.all([
        this.prismaService.applicant.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
            [safeSortBy]: safeSortOrder,
            },
        }),

        this.prismaService.applicant.count({
            where,
        }),
        ]);

        return {
        data: applicants,
        meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
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
