import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

    return product;
  } catch (error) {
    console.log(error);
    throw new InternalServerErrorException('Ayuda!');
  }
}
}
