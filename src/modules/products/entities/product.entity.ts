import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../categories/entities/category.entity';
import { Provider } from '../../providers/entities/provider.entity';
import { User } from '../../../auth/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'int4', nullable: false })
  category_id: number;

  @Column({ type: 'int4', nullable: false })
  provider_id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 50 })
  brand: string;

  @Column({ type: 'varchar', length: 50 })
  model: string;

  @Column({ type: 'float', default: 0 })
  buy_price: number;

  @Column({ type: 'float', default: 0 })
  sale_price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'bool', default: true })
  isAvailable: boolean;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.product, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Provider)
  @JoinColumn({ name: 'provider_id', referencedColumnName: 'id' })
  provider: Provider;

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
