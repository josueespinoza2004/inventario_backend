import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { ProvidersService } from '../../services/providers/providers.service';
import { CreateProviderDto, UpdateProviderDto } from '../../dto/provider.dto';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  async getFindAll(@Query() paginationDto: PaginationDto) {
    const result = await this.providersService.findAll(paginationDto);
    // Forzar el formato correcto
    return {
      data: Array.isArray(result.data) ? result.data : [],
      total: typeof result.total === 'number' ? result.total : 0,
    };
  }

  @Post()
  createProvider(@Body() createProviderDto: CreateProviderDto) {
    console.log('Llega al controller:', createProviderDto);
    return this.providersService.create(createProviderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.providersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateProviderDto: UpdateProviderDto,
  ) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.providersService.remove(id);
  }
}
