import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProviderDto, UpdateProviderDto } from '../../dto/provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '../../entities/provider.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async findAll(paginationDto: PaginationDto) {
    const [data, total] = await this.providerRepository.findAndCount({
      take: paginationDto.limit,
      skip: paginationDto.offset,
    });
    return { data, total };
  }

  async create(createProviderDto: CreateProviderDto) {
    try {
      console.log('DTO recibido:', createProviderDto);
      const provider = this.providerRepository.create(createProviderDto);
      await this.providerRepository.save(provider);

      return provider;
    } catch (error) {
      console.log('Error al crear proveedor:', error);
      //console.log(error);
      //throw new InternalServerErrorException('Ayuda!');
      this.handleDBException(error);
    }
  }
  async findOne(id: number) {
    const provider = await this.providerRepository.findOneBy({ id });
    if (!provider) {
      throw new NotFoundException(
        `Proveedor con id ${id} no encontrado en la base de datos`,
      );
    }
    return provider;
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    const provider = await this.providerRepository.findOne({ where: { id } });

    if (!provider) {
      throw new NotFoundException(`Proveedor con id ${id} no encontrada`);
    }

    try {
      this.providerRepository.merge(provider, updateProviderDto);
      await this.providerRepository.save(provider);
      return {
        message: 'Registro actualizado con exito',
        data: provider,
      };
    } catch (error) {
      this.handleDBException(error);
    }
  }

  //async remove(id: number) {
  //const provider = await this.findOne(id);
  //await this.providerRepository.remove(provider);

  //return {
  //message: `Proveedor de nombre ${provider.name} ha sido elimnado correctamente`,
  //};
  //}

  async remove(id: number) {
    const exists = await this.providerRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Proveedor con id ${id} no encontrado`);
    }

    await this.providerRepository.softDelete(id);

    return {
      message: `Proveedor con id ${id} eliminado con exito`,
      deleteAdt: new Date(),
    };
  }

  async deleteAllProviders() {
    const query = this.providerRepository.createQueryBuilder('provider');

    try {
      return await query.delete().where({}).execute();
    } catch (error) {
      this.handleDBException(error);
    }
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
