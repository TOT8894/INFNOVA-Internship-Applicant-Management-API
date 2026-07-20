import { UnauthorizedException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from "../auth/dto/login.dto";
dotenv.config()

let ACCESS_KEY = process.env.ACCESS_KEY
let ACCESS_EXPIRE_DATE = process.env.ACCESS_EXPIRE_DATE
let REFRESH_EXPIRE_DATE = process.env.REFRESH_EXPIRE_DATE
let REFRESH_KEY = process.env.REFRESH_KEY

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService:PrismaService,
        private readonly jwtService:JwtService

    ){}

    async getMe(id:string){
        let admin = await this.prismaService.admin.findFirst({
            where:{
                id:Number(id),
                deletedAt:null
            },
            select:{
                id: true,
                email: true,
                createdAt: true,
            }
        })
        if(!admin){

            throw new UnauthorizedException("admin not found")
        }
        return admin
    }

    async login(loginDto:LoginDto){
        let {email,password} = loginDto
        let admin = await this.prismaService.admin.findFirst({
            where:{
                email,
                deletedAt:null
            }
        })
        if(!admin){

            throw new UnauthorizedException("invalid credential")
        }
        let match = await bcrypt.compare(password,admin.password)
        if(!match){

            throw new UnauthorizedException("invalid credential")
        }
        const payload={
            sub:admin.id,
            email:admin.email
        }
        let accesstoken = await this.jwtService.signAsync(
            payload,
            {secret:ACCESS_KEY,
            expiresIn:ACCESS_EXPIRE_DATE}
        )
        let refreshtoken = await this.jwtService.signAsync(
            payload,
            {secret:REFRESH_KEY,
            expiresIn: REFRESH_EXPIRE_DATE}
        )
        return{
            accesstoken,
            refreshtoken,
        }
    }
}