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
  @Get('excel/customers')
  async getCustomerReport(@Res() res: Response): Promise<void> {
    await this.reportService.generateCustomerReport(res);
  }
  @Get('excel/sales')
  async getSaleReport(@Res() res: Response): Promise<void> {
    await this.reportService.generateSaleReport(res);
  }
  @Get('excel/users')
  async getUserReport(@Res() res: Response): Promise<void> {
    await this.reportService.generateUserReport(res);
  }
}
