import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportService } from '../../services/report/report.service';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('excel/providers')
  async getExcelReport(@Res() res: Response): Promise<void> {
    await this.reportService.generateExcelReport(res);
  }
  @Get('excel/products')
  async getProductReport(@Res() res: Response): Promise<void> {
    await this.reportService.generateProductReport(res);
  }
  @Get('excel/categories')
  async getCategoryReport(@Res() res: Response): Promise<void> {
    await this.reportService.generateCategoryReport(res);
  }
}
