import { Body, Controller, Get, Post } from '@nestjs/common';
import { SalesService } from '../services/sales.service';
import { CreateSaleDto } from '../dto/sale.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  getSalesAll() {
    return 'Todas las ventas';
  }

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }
}
