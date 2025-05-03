import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../../providers/entities/provider.entity';
import { Product } from '../../../products/entities/product.entity';
import { Category } from '../../../categories/entities/category.entity';
import { Customer } from '../../../customers/entities/customer.entity';
import { Sale } from '../../../sales/entities/sale.entity';
import { User } from '../../../../auth/entities/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async generateCustomerReport(res: Response): Promise<void> {
    // Obtener datos de la base de datos
    const customers = await this.customerRepository.find();

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Clientes');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre', key: 'name', width: 30 },
      { header: 'Correo Electrónico', key: 'e_mail', width: 30 },
      { header: 'Teléfono', key: 'phone_number', width: 15 },
      { header: 'Dirección', key: 'address', width: 40 },
    ];

    // Agregar datos al reporte
    customers.forEach((customer) => {
      worksheet.addRow({
        id: customer.id,
        name: customer.name,
        e_mail: customer.e_mail,
        phone_number: customer.phone_number,
        address: customer.address,
      });
    });

    // Configurar el encabezado de respuesta para descargar el archivo
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=Clientes.xlsx');

    // Enviar el archivo Excel como respuesta
    await workbook.xlsx.write(res);
    res.end();
  }
  async generateSaleReport(res: Response): Promise<void> {
    // Obtener datos de la base de datos
    const sales = await this.saleRepository.find();

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Ventas');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Fecha', key: 'date', width: 20 },
      { header: 'Total', key: 'total', width: 15 },
      { header: 'Método de Pago', key: 'payment_method', width: 20 },
    ];

    // Agregar datos al reporte
    sales.forEach((sale) => {
      worksheet.addRow({
        id: sale.id,
        date: sale.date,
        total: sale.total,
        payment_method: sale.payment_method,
      });
    });

    // Configurar el encabezado de respuesta para descargar el archivo
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=Ventas.xlsx');

    // Enviar el archivo Excel como respuesta
    await workbook.xlsx.write(res);
    res.end();
  }
  async generateUserReport(res: Response): Promise<void> {
    // Obtener datos de la base de datos
    const users = await this.userRepository.find();

    // Crear un nuevo libro de Excel
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Usuarios');

    // Agregar encabezados
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre Completo', key: 'fullName', width: 30 },
      { header: 'Correo Electrónico', key: 'email', width: 30 },
      { header: 'Activo', key: 'isActive', width: 10 },
      { header: 'Roles', key: 'roles', width: 30 },
    ];

    // Agregar datos al reporte
    users.forEach((user) => {
      worksheet.addRow({
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        isActive: user.isActive ? 'Sí' : 'No',
        roles: user.roles.join(', '), // Convierte el array de roles a una cadena
      });
    });

    // Configurar el encabezado de respuesta para descargar el archivo
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', 'attachment; filename=Usuarios.xlsx');

    // Enviar el archivo Excel como respuesta
    await workbook.xlsx.write(res);
    res.end();
  }
}
