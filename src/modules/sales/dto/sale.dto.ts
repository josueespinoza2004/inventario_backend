import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateSaleDto {
  @IsOptional()
  @IsNumber()
  @ApiProperty()
  id?: number;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  date: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  total: number;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  payment_method: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  sale_price?: number;

  @IsOptional()
  @ApiProperty()
  isAvailable?: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  readonly customer_id: number;
}

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
