import { Module } from '@nestjs/common';
import { SalesController } from './controllers/sales.controller';
import { SalesService } from './services/sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Customer } from '../customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Customer])],
  controllers: [SalesController],
  providers: [SalesService],
  exports: [TypeOrmModule, SalesService],
})
export class SalesModule {}
