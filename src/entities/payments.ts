import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Payments {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  amount: number;
  @Column()
  paid_by_user_id: number;
  @Column()
  paid_on_behalf_of_user_id: number;
  @Column()
  notes: string;
}
