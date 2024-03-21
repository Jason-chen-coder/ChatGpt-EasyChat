import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('user')
export class User {
  // id为主键并且自动递增
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string | null;

  @Column({ nullable: true })
  phoneNumber: string | null;

  @Column()
  userName: string;

  @Column()
  password: string;

  @Column()
  signUpType: string;

  @CreateDateColumn()
  createTime: Date;
}
