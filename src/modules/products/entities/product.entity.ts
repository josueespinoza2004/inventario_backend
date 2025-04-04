import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  brand: string;

  @Column({ type: 'float', default: 0 })
  buy_price: number;

  @Column({ type: 'float', default: 0 })
  sale_price: number;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @Column({ type: 'varchar', length: 50 })
  provider: string;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'bool', default: true })
  isAvailable: boolean;
}
