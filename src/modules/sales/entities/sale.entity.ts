import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @CreateDateColumn({
    type: 'timestamp',
    // name: 'create_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleteAt?: Date;
}
