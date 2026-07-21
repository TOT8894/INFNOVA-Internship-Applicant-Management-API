import { Controller, Get,UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth ,ApiTags} from '@nestjs/swagger'
@ApiTags('dashboard')
@Controller('dashboard')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard('jwt'))
export class DashboardController {
    constructor(
        private readonly dashBoardService:DashboardService
    ){}
    @Get("/summary")
    async getSummaryCount(){
        return await this.dashBoardService.getSummary()
    }
}
