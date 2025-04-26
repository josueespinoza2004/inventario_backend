import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
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

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  model?: string;

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

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  stock?: number;

  @IsOptional()
  @ApiProperty()
  isAvailable?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  readonly category_id: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  readonly provider_id: number;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}
