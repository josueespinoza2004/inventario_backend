import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SalesService } from '../services/sales.service';
import { CreateSaleDto, UpdateSaleDto } from '../dto/sale.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Get()
  getFindAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto);
    return this.salesService.findAll(paginationDto);
  }

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    return this.salesService.create(createSaleDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.salesService.remove(id);
  }
}
