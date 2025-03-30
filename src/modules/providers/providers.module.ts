import { Module } from '@nestjs/common';
import { ProvidersController } from './controllers/providers/providers.controller';
import { ProvidersService } from './services/providers/providers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])],
  controllers: [ProvidersController],
  providers: [ProvidersService],
  exports: [TypeOrmModule, ProvidersService],
})
export class ProvidersModule {}
