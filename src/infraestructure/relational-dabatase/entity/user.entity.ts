import { Column, Entity, OneToMany } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { RdbBaseEntity } from './base.entity';

@Entity('user')
export class UserEntity extends RdbBaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false, unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => ProjectEntity, (project) => project.user)
  projects: ProjectEntity[];
}
