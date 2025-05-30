import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto, UpdateCategoryDto } from '../dto/category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../../common/dto/pagination.dto';

@Injectable()
export class CategoriesService {
  private readonly looger = new Logger('categoryService');
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const [ data, total ] = await this.categoryRepository.findAndCount({
      take: paginationDto.limit,
      skip: paginationDto.offset,
    });
    return { data, total };
  }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = this.categoryRepository.create(createCategoryDto);
      await this.categoryRepository.save(category);

      return category;
    } catch (error) {
      //console.log(error);
      //throw new InternalServerErrorException('Ayuda!');
      this.handleDBException(error);
    }
  }
  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(
        `Categoria con id ${id} no encontrada en la base de datos`,
      );
    }
    return category;
  }
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    }

    try {
      this.categoryRepository.merge(category, updateCategoryDto);
      await this.categoryRepository.save(category);

      return {
        message: 'Registro actualizado con exito',
        data: category,
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }
  // async remove(id: number) {
  //   const sale = await this.findOne(id);
  //   await this.saleRepository.remove(sale);

  //   return {
  //     message: `Venta con id ${id} ha sido eliminada correctamente`,
  //   };
  // }

  async remove(id: number) {
    const exists = await this.categoryRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Categoria con id ${id} no encontrada`);
    }

    await this.categoryRepository.softDelete(id);

    return {
      message: `Categoria con id ${id} eliminada con exito`,
      deleteAt: new Date(),
    };
  }

  async deleteAllCategories() {
    const query = this.categoryRepository.createQueryBuilder('category');

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
