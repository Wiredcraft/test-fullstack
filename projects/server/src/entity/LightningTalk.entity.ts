import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LightningTalk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  user: string;

  @Column({ length: 60 })
  title: string;

  @Column({ length: 200 })
  description: string;

  @Column({ type: "datetime" })
  date_created: string;

  @Column({ type: "int", default: 0 })
  poll?: number;
}
