import { Injectable } from '@nestjs/common';
import { ProductsService } from '../modules/products/services/products.service';
import { initialData } from './data/seed-data';
import { Product } from '../modules/products/entities/product.entity';
import { CategoriesService } from '../modules/categories/services/categories.service';
import { Category } from '../modules/categories/entities/category.entity';
import { Provider } from '../modules/providers/entities/provider.entity';
import { ProvidersService } from '../modules/providers/services/providers/providers.service';
import { SalesService } from '../modules/sales/services/sales.service';
import { Sale } from '../modules/sales/entities/sale.entity';
import { CustomersService } from '../modules/customers/services/customers.service';
import { Customer } from '../modules/customers/entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly providersService: ProvidersService,
    private readonly salesService: SalesService,
    private readonly customersService: CustomersService,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeedProducts() {
    await this.deleteTables();

    const adminUser = await this.insertUsers();

    await this.insertNewProducts(adminUser);
    return 'SEED EXECUTED';
  }

  async runSeedCategories() {
    await this.deleteTables();
    await this.insertNewCategories();
    return 'SEED CATEGORIES EXECUTED';
  }
  private async insertNewCategories() {
    await this.categoriesService.deleteAllCategories();

    const categories = initialData.categories;
    const insertPromises: Promise<Category | undefined>[] = [];

    // categories.forEach((category) => {
    //   insertPromises.push(this.categoriesService.create(category));
    // });
    await Promise.all(insertPromises);
    return true;
  }

  async runSeedProviders() {
    await this.deleteTables();
    await this.insertNewProviders();
    return 'SEED PROVIDERS EXECUTED';
  }
  private async insertNewProviders() {
    await this.providersService.deleteAllProviders();

    const providers = initialData.providers;
    const insertPromises: Promise<Provider | undefined>[] = [];

    // providers.forEach((provider) => {
    //   insertPromises.push(this.providersService.create(provider));
    // });
    await Promise.all(insertPromises);
    return true;
  }

  async runSeedSales() {
    await this.insertNewSales();
    return 'SEED SALES EXECUTED';
  }
  private async insertNewSales() {
    await this.salesService.deleteAllSales();

    const sales = initialData.sales;
    const insertPromises: Promise<Sale | undefined>[] = [];

    sales.forEach((sale) => {
      insertPromises.push(this.salesService.create(sale));
    });

    await Promise.all(insertPromises);
    return true;
  }

  async runSeedCustomers() {
    await this.insertNewCustomers();
    return 'SEED CUSTOMERS EXECUTED';
  }
  private async insertNewCustomers() {
    await this.customersService.deleteAllCustomers();
    const customers = initialData.customers;
    const insertPromises: Promise<Customer | undefined>[] = [];
    customers.forEach((customer) => {
      insertPromises.push(this.customersService.create(customer));
    });
    await Promise.all(insertPromises);
    return true;
  }

  private async deleteTables() {
    await this.productsService.deleteAllProducts();

    const queryBuilder = this.userRepository.createQueryBuilder();

    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;

    const users: User[] = [];

    seedUsers.forEach((user) => {
      users.push(this.userRepository.create(user));
    });

    const dbUser = await this.userRepository.save(seedUsers);

    return dbUser[0];
  }

  private async insertNewProducts(user: User) {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: Promise<Product | undefined>[] = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product, user));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
