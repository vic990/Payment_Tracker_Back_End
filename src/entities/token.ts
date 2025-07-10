import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class refresh_tokens {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  token: string;

  @Column()
  user_id: number;
}
