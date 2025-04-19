import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSaleDto } from '../dto/sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../entities/sale.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async create(createSaleDto: CreateSaleDto) {
    try {
      const sale = this.saleRepository.create(createSaleDto);
      await this.saleRepository.save(sale);

      return sale;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda');
    }
  }
}
