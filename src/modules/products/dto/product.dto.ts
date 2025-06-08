import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  name?: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  description: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  brand?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  model?: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  buy_price?: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  sale_price?: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  stock?: number;

  @IsOptional()
  @ApiProperty()
  isAvailable?: boolean;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  @IsNotEmpty()
  readonly category_id: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiProperty()
  @IsNotEmpty()
  readonly provider_id: number;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'URL de la imagen del producto',
    required: false,
  })
  image?: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;

  @IsOptional()
  description: string;
}
