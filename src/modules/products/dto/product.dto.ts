import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
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

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  buy_price?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  sale_price?: number;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  category?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  provider?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  stock?: number;

  @IsOptional()
  @ApiProperty()
  isAvailable?: boolean;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
