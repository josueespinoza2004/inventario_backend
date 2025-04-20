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
  getFindAll(@Query() paginationDto: PaginationDto) {
    return this.providersService.findAll(paginationDto);
  }

  @Post()
  createProvider(@Body() createProviderDto: CreateProviderDto) {
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
