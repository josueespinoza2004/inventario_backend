import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateProviderDto } from '../../dto/provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '../../entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async create(createProviderDto: CreateProviderDto) {
    try {
      const provider = this.providerRepository.create(createProviderDto);
      await this.providerRepository.save(provider);

      return createProviderDto;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Ayuda!');
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

  async remove(id: number) {
    const provider = await this.findOne(id);
    await this.providerRepository.remove(provider);

    return {
      message: `Proveedor de nombre ${provider.name} ha sido elimnado correctamente`,
    };
  }

  private handleDBException(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Error inesperado, verifique los registros del servidor',
    );
  }
}
