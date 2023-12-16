import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class RdbBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, generated: 'uuid', unique: true })
  _id: string;

  @Column({ nullable: false, default: true })
  isActive: boolean;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;
}
