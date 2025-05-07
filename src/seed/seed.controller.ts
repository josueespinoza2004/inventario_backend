import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';
// import { Auth } from '../auth/decorators';
// import { ValidRoles } from '../auth/interfaces';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  // @Auth(ValidRoles.admin)
  executeSeed() {
    return this.seedService.runSeedProducts();
  }

  @Get('products')
  executeSeedProducts() {
    return this.seedService.runSeedProducts();
  }
  @Get('categories')
  executeSeedCategories() {
    return this.seedService.runSeedCategories();
  }
  @Get('providers')
  executeSeedProviders() {
    return this.seedService.runSeedProviders();
  }

  @Get('sales')
  executeSeedSales() {
    return this.seedService.runSeedSales();
  }
  @Get('customers')
  executeSeedCustomers() {
    return this.seedService.runSeedCustomers();
  }
}
