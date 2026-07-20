import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async getSummary(){

        const [
            totalApplicant,
            applicantsGroupByStatus,
            applicantsGroupByTrack,
        ]= await Promise.all([
            this.prismaService.applicant.count({
            where:{
                deletedAt:null
            }}),
            this.applicantsByStatus(),
            this.applicantsBytrack()
        ])
       

        return{
            totalApplicant,
            applicantsGroupByStatus,
            applicantsGroupByTrack,
        }
    }


    private async applicantsByStatus(){
        const applicantsByStatus = await this.prismaService.applicant.groupBy({
            by:['status'],
            where:{
                deletedAt:null
            },
            _count:{
                id:true
            }
        })
        return applicantsByStatus.map(item=>({
            status:item.status,
            totalApplicants:item._count.id
            }
        ))
    }


    private async applicantsBytrack(){
        const applicantsByTrack = await this.prismaService.applicant.groupBy({
            by:['track'],
            where:{
                deletedAt:null
            },
            _count:{
                id:true
            }
        })
        return applicantsByTrack.map(item=>({
            track:item.track,
            totalApplicants:item._count.id
            }
        ))
    }


}
