import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from '../../services/report/report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('excel')
  async getExcelReport(@Res() res: Response): Promise<void> {
    await this.reportService.generateExcelReport(res);
  }
}
