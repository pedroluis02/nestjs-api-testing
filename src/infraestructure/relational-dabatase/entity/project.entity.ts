import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { ProjectTypeEntity } from './project-type.entity';
import { RdbBaseEntity } from './base.entity';
import { UserEntity } from './user.entity';

@Entity('project')
export class ProjectEntity extends RdbBaseEntity {
  @Column({ nullable: false, unique: true })
  code: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false, default: '' })
  description: string;

  @Column()
  typeId: number;

  @Column()
  userId: number;

  @OneToOne(() => ProjectTypeEntity, { eager: true })
  @JoinColumn({ name: 'typeId', referencedColumnName: 'id' })
  type: ProjectTypeEntity;

  @ManyToOne(() => UserEntity, (user) => user.projects, { eager: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
