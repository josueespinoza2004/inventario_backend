import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn('increment', { type: 'int4' })
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  address: string;

  @Column({ type: 'int4' })
  phone_number: number;

  @Column({ type: 'varchar', length: 50 })
  contact: string;

  @Column({ type: 'varchar', length: 50 })
  e_mail: string;

  @Column({ type: 'varchar', length: 50 })
  password: string;

  @Column({ type: 'bool', default: true })
  isAvailable: boolean;
}
