import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto/customer.dto';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger('CustomerService');

  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const [data, total] = await this.customerRepository.findAndCount({
      take: paginationDto.limit,
      skip: paginationDto.offset,
    });
    return { data, total };
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      console.log('DTO recibido: ', createCustomerDto);
      const customer = this.customerRepository.create(createCustomerDto);
      await this.customerRepository.save(customer);

      return customer;
    } catch (error) {
      // console.log(error);
      // throw new InternalServerErrorException('Ayuda!');
      this.handleDBException(error);
    }
  }

  async findOne(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });
    if (!customer) {
      throw new NotFoundException(
        `Cliente con id ${id} no encontrado en la base de datos`,
      );
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Cliente con id ${id} no econtrado`);
    }
    try {
      this.customerRepository.merge(customer, updateCustomerDto);
      await this.customerRepository.save(customer);

      return {
        message: `Registro actualizado con exito`,
        data: customer,
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }
  //async remove(id: number) {
  //const customer = await this.findOne(id);
  //await this.customerRepository.remove(customer);

  //return {
  //message: `Cliente de nombre ${customer.name} ha sido elimnado correctamente`,
  //};
  //}

  async remove(id: number) {
    const exists = await this.customerRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }

    await this.customerRepository.softDelete(id);

    return {
      message: `Cliente con id ${id} eliminado con exito`,
      deletedAt: new Date(),
    };
  }

  async deleteAllCustomers() {
    const query = this.customerRepository.createQueryBuilder('customer');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
