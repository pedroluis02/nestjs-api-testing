import { Column, Entity } from 'typeorm';
import { RdbBaseEntity } from './base.entity';

@Entity('project_type')
export class ProjectTypeEntity extends RdbBaseEntity {
  @Column({ nullable: false, unique: true })
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, default: '' })
  description: string;
}
