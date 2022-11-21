import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class LightningTalk {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  author: string;

  @Column({ length: 60 })
  title: string;

  @Column({ type: "text" })
  content: string;

  @Column({ type: "datetime" })
  date_created: string;
}
