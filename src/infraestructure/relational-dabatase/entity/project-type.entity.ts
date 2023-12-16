import { Column, Entity } from 'typeorm';
import { RdbBaseEntity } from './base.entity';

@Entity('project_type')
export class ProjectTypeEntity extends RdbBaseEntity {
  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false, default: '' })
  description: string;
}
