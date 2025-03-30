import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCustomerDto } from '../dto/customer.dto';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer);

      return customer;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
    }
  }
}
