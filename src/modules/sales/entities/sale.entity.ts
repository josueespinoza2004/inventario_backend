import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'int4', nullable: false })
  customer_id: number;

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

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id', referencedColumnName: 'id' })
  customer: Customer;

  @CreateDateColumn({
    type: 'timestamp',
    // name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
