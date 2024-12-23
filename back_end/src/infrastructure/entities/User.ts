import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  Unique,
} from 'typeorm';

import { Constants } from '../../common/utils/Constant';
import { BaseEntity } from './BaseEntity';
import { PasswordResetOtps } from './PasswordResetOtps';

@Entity()
export class User extends BaseEntity {
  @Column({
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    name: 'username',
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({ select: true, nullable: false })
  password: string;

  @Column({
    select: false,
    nullable: true,
  })
  token: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: false,
    default: Constants.USER_ROLE.USER,
  })
  role: number;

  @OneToOne(() => PasswordResetOtps, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  passwordResetOtps: PasswordResetOtps;
}
