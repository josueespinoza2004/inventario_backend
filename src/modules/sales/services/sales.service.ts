import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateSaleDto, UpdateSaleDto } from '../dto/sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../entities/sale.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Customer } from '../../customers/entities/customer.entity';

@Injectable()
export class SalesService {
  private readonly looger = new Logger('SaleService');

  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const [data, total] = await this.saleRepository.findAndCount({
      take: paginationDto.limit,
      skip: paginationDto.offset,
      relations: ['customer'],
    });
    return { data, total };
  }

  async create(createSaleDto: CreateSaleDto) {
    try {
      console.log('DTO recibido: ', createSaleDto);
      const sale = this.saleRepository.create(createSaleDto);
      await this.saleRepository.save(sale);

      return sale;
    } catch (error) {
      // console.log(error);
      // throw new InternalServerErrorException('Ayuda');
      this.handleDBException(error);
    }
  }
  async findOne(id: number) {
    const sale = await this.saleRepository.findOneBy({ id });
    if (!sale) {
      throw new NotFoundException(
        `Venta con id ${id} no encontrada en la base de datos`,
      );
    }
    return sale;
  }

  async update(id: number, changes: UpdateSaleDto) {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: { customer: true },
    });

    if (!sale) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }

    if (changes.customer_id) {
      const customer = await this.customerRepository.findOneBy({
        id: changes.customer_id,
      });
      if (!customer) {
        throw new NotFoundException(
          `Cliente con id ${changes.customer_id} no encontrado`,
        );
      }
      sale.customer = customer;
    }
    this.saleRepository.merge(sale, changes);
    const update = await this.saleRepository.save(sale);

    return {
      message: `Venta actualizada con exito`,
      data: update,
    };
  }

  // async remove(id: number) {
  //   const sale = await this.findOne(id);
  //   await this.saleRepository.remove(sale);

  //   return {
  //     message: `Venta con id ${id} ha sido eliminada correctamente`,
  //   };
  // }

  async remove(id: number) {
    const exists = await this.saleRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }

    await this.saleRepository.softDelete(id);

    return {
      message: `Venta con id ${id} eliminada con exito`,
      deleteAt: new Date(),
    };
  }
  async deleteAllSales() {
    const query = this.saleRepository.createQueryBuilder('sales');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.looger.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verififque los registros del servidor',
    );
  }
}
