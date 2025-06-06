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
  async getFindAll(@Query() paginationDto: PaginationDto) {
    // console.log(paginationDto);
    const limit = Number(paginationDto.limit) || 3;
    const offset = Number(paginationDto.offset) || 0;
    const result = await this.salesService.findAll({ limit, offset });

    return {
      data: Array.isArray(result.data) ? result.data : [],
      total: typeof result.total === 'number' ? result.total : 0,
    };
  }

  @Post()
  createSale(@Body() createSaleDto: CreateSaleDto) {
    console.log('Llega al controller: ', createSaleDto);
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
