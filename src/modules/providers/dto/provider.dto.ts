import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProviderDto {
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
  @IsOptional()
  @ApiProperty()
  address?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @ApiProperty()
  phone_number?: number;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  contact?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  e_mail?: string;

  @IsString()
  @MinLength(3)
  @IsOptional()
  @ApiProperty()
  ruc_number?: string;

  @IsOptional()
  @ApiProperty() // Asegúrate de que ApiProperty esté aquí
  isAvailable?: boolean;
}

export class UpdateProviderDto extends PartialType(CreateProviderDto) {}
