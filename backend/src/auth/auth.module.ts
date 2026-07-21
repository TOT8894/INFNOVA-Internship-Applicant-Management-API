import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,

    JwtModule.register({
      secret: process.env.ACCESS_KEY!,
      signOptions: {
        expiresIn: process.env.ACCESS_EXPIRE_DATE as any,
      },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    JwtStrategy, 
  ],

  exports: [
    JwtModule,
    PassportModule,
  ],
})
export class AuthModule {}