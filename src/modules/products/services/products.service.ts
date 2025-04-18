import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 3, offset = 0 } = paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);
      await this.productRepository.save(product);

      return product;
    } catch (error) {
      // console.log(error);
      // throw new InternalServerErrorException('Ayuda!');
      this.handleDBException(error);
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException(
        `Producto con id ${id} no encontrado en la base de datos`,
      );
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    try {
      this.productRepository.merge(product, updateProductDto);
      await this.productRepository.save(product);

      return {
        message: 'Registro actualizado con exito',
        data: product,
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  // async remove(id: number) {
  //   const product = await this.findOne(id);
  //   await this.productRepository.remove(product);

  //   return {
  //     message: `Producto de marca ${product.brand} ha sido elimnado correctamente`,
  //   };
  // }

  async remove(id: number) {
    const exists = await this.productRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }

    await this.productRepository.softDelete(id);

    return {
      message: `Auto con id ${id} eliminado con exito`,
      deleteAt: new Date(),
    };
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
