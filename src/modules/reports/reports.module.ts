import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../providers/entities/provider.entity'; // Importa la entidad Provider
import { ReportController } from './controllers/report/report.controller';
import { ReportService } from './services/report/report.service';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Provider, Product, Category])], // Registra el repositorio de Provider
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
