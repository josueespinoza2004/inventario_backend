import {
  BadGatewayException,
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getFindAll(@Query() params: PaginationDto) {
    try {
      const { products, total } = await this.productsService.findAll(params);

      const data = {
        data: products.map((product) => ({
          ...product,
          image: product.image
            ? `${process.env.BASE_URL}${product.image}`
            : null,
        })),
        total, // Incluye el total en la respuesta
      };

      return data;
    } catch (error) {
      throw new BadRequestException('Error al obtener los productos');
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return {
      message: 'Imagen subida correctamente',
      filePath: `/uploads/products/${file.filename}`,
    };
  }

  @Post()
  @Auth(ValidRoles.admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() createProductDto: CreateProductDto,
    @GetUser() user: User,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log('Datos recibidos en el backend:', createProductDto);
    console.log('Archivo recibido:', file);

    const imagePath = file ? `/uploads/products/${file.filename}` : undefined;
    const nuevo = await this.productsService.create(
      createProductDto,
      user,
      imagePath,
    );
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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/products',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
    @GetUser() user: User,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const imagePath = file ? `/uploads/products/${file.filename}` : undefined;
    const datos = await this.productsService.update(
      id,
      { ...updateProductDto, image: imagePath },
      user,
    );
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
