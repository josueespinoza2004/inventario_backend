import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../../providers/entities/provider.entity';
import { Product } from '../../../products/entities/product.entity';
import { Category } from '../../../categories/entities/category.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>, // Nuevo repositorio
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
  async generateProductReport(res: Response): Promise<void> {
    // Obtener datos de la base de datos
    const products = await this.productRepository.find();

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Productos');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Descripción', key: 'description', width: 40 },
      { header: 'Precio de Compra', key: 'buy_price', width: 15 },
      { header: 'Precio de Venta', key: 'sale_price', width: 15 },
      { header: 'Stock', key: 'stock', width: 10 },
      { header: 'Disponible', key: 'isAvailable', width: 15 },
    ];

    // Agregar datos al reporte
    products.forEach((product) => {
      worksheet.addRow({
        id: product.id,
        name: product.name,
        description: product.description,
        buy_price: product.buy_price,
        sale_price: product.sale_price,
        stock: product.stock,
        isAvailable: product.isAvailable ? 'Sí' : 'No',
      });
    });

    // Configurar el encabezado de respuesta para descargar el archivo
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=Productos.xlsx');

    // Enviar el archivo Excel como respuesta
    await workbook.xlsx.write(res);
    res.end();
  }
  async generateCategoryReport(res: Response): Promise<void> {
    // Obtener datos de la base de datos
    const categories = await this.categoryRepository.find();

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Categorías');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
    ];

    // Agregar datos al reporte
    categories.forEach((category) => {
      worksheet.addRow({
        id: category.id,
        name: category.name,
      });
    });

    // Configurar el encabezado de respuesta para descargar el archivo
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=Categorias.xlsx',
    );

    // Enviar el archivo Excel como respuesta
    await workbook.xlsx.write(res);
    res.end();
  }
}
