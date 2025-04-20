import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvidersController } from './modules/providers/controllers/providers/providers.controller';
import { ProvidersService } from './modules/providers/services/providers/providers.service';
import { ProvidersModule } from './modules/providers/providers.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SalesModule } from './modules/sales/sales.module';
import { SalesService } from './modules/sales/services/sales.service';
import { CommonModule } from './common/common.module';
import { CategoriesController } from './modules/categories/controllers/categories.controller';
import { CategoriesService } from './modules/categories/services/categories.service';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    ProductsModule,
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),

    ProvidersModule,

    CustomersModule,

    CommonModule,

    SalesModule,

    CategoriesModule,
  ],
  controllers: [ProvidersController, CategoriesController],
  providers: [ProvidersService, SalesService, CategoriesService],
})
export class AppModule {}
