import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  date: string;

  @Column({ type: 'float', default: 0 })
  total: number;

  @Column({ type: 'varchar', length: 50 })
  payment_method: string;

  @Column({ type: 'float', default: 0 })
  sale_price: number;

  @Column({ type: 'bool', default: true })
  isAvailable: boolean;
}
