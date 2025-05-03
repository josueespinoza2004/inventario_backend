import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../providers/entities/provider.entity'; // Importa la entidad Provider
import { ReportController } from './controllers/report/report.controller';
import { ReportService } from './services/report/report.service';
import { Product } from '../products/entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Sale } from '../sales/entities/sale.entity';
import { User } from '../../auth/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Provider,
      Product,
      Category,
      Customer,
      Sale,
      User,
    ]),
  ], // Registra el repositorio de Provider
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
