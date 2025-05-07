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
import { Category } from '../../categories/entities/category.entity';
import { Provider } from '../../providers/entities/provider.entity';
import { User } from '../../../auth/entities/user.entity';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>, // Nuevo repositorio
  ) {}

  findAll(paginationDto: PaginationDto) {
    const { limit = 3, offset = 0 } = paginationDto;
    return this.productRepository.find({
      take: limit,
      skip: offset,
      relations: {
        category: true,
      },
    });
  }

  async create(createProductDto: CreateProductDto, user: User) {
    try {
      const product = this.productRepository.create({
        ...createProductDto,
        user,
      });
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

  async update(id: number, changes: UpdateProductDto, user: User) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true, user: true },
    });

    if (!product) {
      throw new NotFoundException(`Producto con id ${id} no encontrado`);
    }
    if (changes.category_id) {
      const category = await this.categoryRepository.findOneBy({
        id: changes.category_id,
      });
      if (!category) {
        throw new NotFoundException(
          `Categoria con id ${changes.category_id} no encontrada`,
        );
      }
      product.category = category;
    }

    if (user) {
      product.user = user;
    }

    if (changes.provider_id) {
      const provider = await this.providerRepository.findOneBy({
        id: changes.provider_id,
      });
      if (!provider) {
        throw new NotFoundException(
          `Proveedor con id ${changes.provider_id} no encontrado`,
        );
      }
      product.provider = provider;
    }
    this.productRepository.merge(product, changes);
    const update = await this.productRepository.save(product);

    return {
      message: 'Registro actualizado con exito',
      data: update,
    };
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

  async deleteAllProducts() {
    const query = this.productRepository.createQueryBuilder('product');
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
