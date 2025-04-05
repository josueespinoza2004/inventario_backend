import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';
import { ProvidersService } from '../../services/providers/providers.service';
import { CreateProviderDto } from '../../dto/provider.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get()
  getProvidersAll() {
    return 'Todos los Proveedores';
  }

  @Post()
  createProvider(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.providersService.findOne(id);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.providersService.remove(id);
  }
}
