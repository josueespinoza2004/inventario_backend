import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProviderDto } from '../../dto/provider.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Provider } from '../../entities/provider.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProvidersService {
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
}
