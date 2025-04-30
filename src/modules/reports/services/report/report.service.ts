import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../../providers/entities/provider.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>, // Inyecta el repositorio de Provider
  ) {}

  async generateExcelReport(res: Response): Promise<void> {
    // Obtener datos de la base de datos
    const providers = await this.providerRepository.find();

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Proveedores');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Dirección', key: 'address', width: 30 },
      { header: 'Teléfono', key: 'phone_number', width: 15 },
      { header: 'Contacto', key: 'contact', width: 20 },
      { header: 'Correo Electrónico', key: 'e_mail', width: 30 },
      { header: 'RUC', key: 'ruc_number', width: 20 },
      { header: 'Disponible', key: 'isAvailable', width: 15 },
    ];

    // Agregar datos al reporte
    providers.forEach((provider) => {
      worksheet.addRow({
        id: provider.id,
        name: provider.name,
        address: provider.address,
        phone_number: provider.phone_number,
        contact: provider.contact,
        e_mail: provider.e_mail,
        ruc_number: provider.ruc_number,
        isAvailable: provider.isAvailable ? 'Sí' : 'No',
      });
    });

    // Configurar el encabezado de respuesta para descargar el archivo
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=Proveedores.xlsx',
    );

    // Enviar el archivo Excel como respuesta
    await workbook.xlsx.write(res);
    res.end();
  }
}
