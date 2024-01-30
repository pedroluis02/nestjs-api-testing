import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { RdbBaseEntity } from './base.entity';

@Entity('refresh_token')
export class RefreshTokenEntity extends RdbBaseEntity {
  @Column()
  expires: Date;

  @Column()
  userId: number;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
