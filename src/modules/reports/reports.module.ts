import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from '../providers/entities/provider.entity'; // Importa la entidad Provider
import { ReportController } from './controllers/report/report.controller';
import { ReportService } from './services/report/report.service';

@Module({
  imports: [TypeOrmModule.forFeature([Provider])], // Registra el repositorio de Provider
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
