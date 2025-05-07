import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dto/product.dto';
import { PaginationDto } from '../../../common/dto/pagination.dto';
import { Auth, GetUser } from '../../../auth/decorators';
import { ValidRoles } from '../../../auth/interfaces';
import { User } from '../../../auth/entities/user.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getFindAll(@Query() params: FilterProductDto) {
    // console.log(paginationDto);
    const rows = await this.productsService.findAll(params);

    const data = {
      data: rows,
    };
    return data;
  }

  @Post()
  @Auth(ValidRoles.admin)
  async create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
  ) {
    const nuevo = await this.productsService.create(createProductDto, user);
    const data = {
      data: nuevo,
      message: 'Producto creado correctamente',
    };
    return data;
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    const rows = await this.productsService.findOne(id);
    const data = {
      data: rows,
    };
    return data;
  }

  @Put(':id')
  @Auth(ValidRoles.admin)
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
  ) {
    const datos = await this.productsService.update(id, updateProductDto, user);
    const data = {
      data: datos,
      message: 'Producto actualizado correctamente',
    };
    return data;
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  async remove(@Param('id') id: number) {
    const dato = await this.productsService.remove(id);
    const data = {
      data: dato,
      message: 'Producto eliminado correctamente',
    };
    return data;
  }
}
