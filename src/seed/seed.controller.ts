import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('products')
  executedSeed() {
    return this.seedService.runSeedProducts();
  }
  @Get('categories')
  executedSeedCategories() {
    return this.seedService.runSeedCategories();
  }
  @Get('providers')
  executedSeedProviders() {
    return this.seedService.runSeedProviders();
  }
}
