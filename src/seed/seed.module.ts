import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ProductsModule } from '../modules/products/products.module';
import { CategoriesModule } from '../modules/categories/categories.module';
import { ProvidersModule } from '../modules/providers/providers.module';
import { SalesModule } from '../modules/sales/sales.module';
import { CustomersModule } from '../modules/customers/customers.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    ProductsModule,
    CategoriesModule,
    ProvidersModule,
    SalesModule,
    CustomersModule,
  ],
})
export class SeedModule {}
