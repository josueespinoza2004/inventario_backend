interface SeedProduct {
  name: string;
  description: string;
  brand: string;
  model: string;
  buy_price: number;
  sale_price: number;
  stock: number;
  isAvailable: boolean;
  category_id: number;
  provider_id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface SeedCategory {
  id: number;
  name: string;
}

interface SeedProvider {
  id: number;
  name: string;
  address: string;
  phone_number: number;
  contact: string;
  e_mail: string;
  ruc_number: string;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface SeedData {
  products: SeedProduct[];
  categories: SeedCategory[];
  providers: SeedProvider[];
}

export const initialData: SeedData = {
  categories: [
    { id: 1, name: 'Herramientas manuales' },
    { id: 2, name: 'Herramientas eléctricas' },
    { id: 3, name: 'Accesorios' },
  ],
  providers: [
    {
      id: 1,
      name: 'Proveedor A',
      address: 'Calle Principal 123',
      phone_number: 5551234,
      contact: 'Juan Pérez',
      e_mail: 'juan.perez@proveedora.com',
      ruc_number: '1234567890',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: 'Proveedor B',
      address: 'Avenida Secundaria 456',
      phone_number: 5555678,
      contact: 'María López',
      e_mail: 'maria.lopez@proveedora.com',
      ruc_number: '0987654321',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'Proveedor C',
      address: 'Calle Tercera 789',
      phone_number: 5559101,
      contact: 'Carlos García',
      e_mail: 'carlos.garcia@proveedora.com',
      ruc_number: '1122334455',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'Proveedor D',
      address: 'Avenida Cuarta 101',
      phone_number: 5551122,
      contact: 'Ana Martínez',
      e_mail: 'ana.martinez@proveedora.com',
      ruc_number: '6677889900',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: 'Proveedor E',
      address: 'Calle Quinta 202',
      phone_number: 5553344,
      contact: 'Luis Fernández',
      e_mail: 'luis.fernandez@proveedora.com',
      ruc_number: '5544332211',
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  products: [
    {
      name: 'Martillo de Carpintero',
      description: 'Martillo de acero con mango de madera resistente.',
      brand: 'Truper',
      model: 'TR-MC-16',
      buy_price: 5,
      sale_price: 8,
      stock: 50,
      isAvailable: true,
      category_id: 1,
      provider_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Taladro Percutor',
      description: 'Taladro eléctrico con función de percutor para concreto.',
      brand: 'Bosch',
      model: 'GBH 2-26',
      buy_price: 80,
      sale_price: 120,
      stock: 20,
      isAvailable: true,
      category_id: 2,
      provider_id: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Llave Inglesa Ajustable',
      description: 'Llave ajustable de acero inoxidable de 12 pulgadas.',
      brand: 'Stanley',
      model: 'ST-12',
      buy_price: 10,
      sale_price: 15,
      stock: 30,
      isAvailable: true,
      category_id: 1,
      provider_id: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Sierra Circular',
      description:
        'Sierra circular de 7 1/4 pulgadas con motor de alta potencia.',
      brand: 'Makita',
      model: '5007MG',
      buy_price: 150,
      sale_price: 200,
      stock: 10,
      isAvailable: true,
      category_id: 2,
      provider_id: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Caja de Tornillos',
      description: 'Caja con 500 tornillos de diferentes tamaños.',
      brand: 'Fischer',
      model: 'FX-500',
      buy_price: 20,
      sale_price: 30,
      stock: 100,
      isAvailable: true,
      category_id: 3,
      provider_id: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};
