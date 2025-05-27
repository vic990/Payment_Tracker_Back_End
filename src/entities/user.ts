import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  user_id?: number;

  @Column()
  user_name: string;

  @Column()
  user_lastname: string;

  @Column()
  email: string;

  @Column()
  password_hash: string;

  @Column()
  role_id: string;
}
