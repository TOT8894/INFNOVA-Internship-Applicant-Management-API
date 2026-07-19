import { Injectable } from '@nestjs/common';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { CreateApplicantDto } from './dto/create-applicant.dto';

@Injectable()
export class ApplicantsService {
    private Applicant=[
        {id:124,name:"abebe", email:"abc"},
        {id:125,name:"adane", email:"abcd"},
        {id:126,name:"gebre", email:"abcde"},
    ]
    getallApplicant(){
        return this.Applicant
    }

    getApplicantByQuery(name:string,email:string,id:number){ 
        let result = this.Applicant
        if(name){
            result =  result.filter((Applicant:any)=>(Applicant.name.toLowerCase().includes(name.toLowerCase())))
        }
        if(email){
            result =  result.filter((Applicant:any)=>(Applicant.email.toLowerCase().includes(email.toLowerCase())))
        }
        if(id){
            result =  result.filter(Applicant=>Applicant.id==id)
        }
        return result
    }

    getApplicantById(id:number){
        let applicant = this.Applicant.find(Applicant=>Applicant.id==id)
        return applicant
    }
    createApplicant(createApplicantDto:CreateApplicantDto){
        this.Applicant.push(createApplicantDto)
        return {data:createApplicantDto,message:"applicant created successfuly"}
    }
    
    updateApplicant(id:number,updateApplicantDto:UpdateApplicantDto){
         let index = this.Applicant.findIndex(Applicant=>Applicant.id==id)
        this.Applicant[index]={
            ...this.Applicant[index],
            ...updateApplicantDto
        }
        
        return {data:this.Applicant[index],message:`${id} this Applicant updated`}
    }

    deleteApplicant(id:number){
        let index = this.Applicant.findIndex(Applicant=>Applicant.id==id)
        this.Applicant.splice(index,1)
        return {message:`${id} this Applicant deleted`}
    }
}
