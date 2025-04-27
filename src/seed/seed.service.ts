import { Injectable } from '@nestjs/common';
import { ProductsService } from '../modules/products/services/products.service';
import { initialData } from './data/seed-data';
import { Product } from '../modules/products/entities/product.entity';
import { CategoriesService } from '../modules/categories/services/categories.service';
import { Category } from '../modules/categories/entities/category.entity';
import { Provider } from '../modules/providers/entities/provider.entity';
import { ProvidersService } from '../modules/providers/services/providers/providers.service';

@Injectable()
export class SeedService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly providersService: ProvidersService,
  ) {}

  async runSeedProducts() {
    await this.insertNewProducts();
    return 'SEED PRODUCTS EXECUTED';
  }

  async runSeedCategories() {
    await this.insertNewCategories();
    return 'SEED CATEGORIES EXECUTED';
  }
  private async insertNewCategories() {
    await this.categoriesService.deleteAllCategories();

    const categories = initialData.categories;
    const insertPromises: Promise<Category | undefined>[] = [];

    categories.forEach((category) => {
      insertPromises.push(this.categoriesService.create(category));
    });
    await Promise.all(insertPromises);
    return true;
  }

  async runSeedProviders() {
    await this.insertNewProviders();
    return 'SEED PROVIDERS EXECUTED';
  }
  private async insertNewProviders() {
    await this.providersService.deleteAllProviders();

    const providers = initialData.providers;
    const insertPromises: Promise<Provider | undefined>[] = [];

    providers.forEach((provider) => {
      insertPromises.push(this.providersService.create(provider));
    });
    await Promise.all(insertPromises);
    return true;
  }

  private async insertNewProducts() {
    await this.productsService.deleteAllProducts();

    const products = initialData.products;
    const insertPromises: Promise<Product | undefined>[] = [];

    products.forEach((product) => {
      insertPromises.push(this.productsService.create(product));
    });

    await Promise.all(insertPromises);

    return true;
  }
}
