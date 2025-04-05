import { Body, Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto } from '../dto/customer.dto';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get()
  getCustomersAll() {
    return 'Todos los Clientes';
  }

  @Post()
  createCustomer(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }
}
