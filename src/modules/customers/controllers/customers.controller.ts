import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  async getFindAll(@Query() paginationDto: PaginationDto) {
    const limit = Number(paginationDto.limit) || 3;
    const offset = Number(paginationDto.offset) || 0;

    const result = await this.customersService.findAll({ limit, offset });
    return {
      data: Array.isArray(result.data) ? result.data : [],
      total: typeof result.total === 'number' ? result.total : 0,
    };
  }

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    console.log('Llega al controller: ', createCustomerDto);
    return this.customersService.create(createCustomerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }
}
