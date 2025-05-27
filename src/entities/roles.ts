import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  roleName: string;
}
