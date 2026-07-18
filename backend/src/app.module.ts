import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApplicantsModule } from './applicants/applicants.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, ApplicantsModule, DashboardModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
