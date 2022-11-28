import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Salon } from "./Salon";

@ObjectType()
@Entity()
export class Gallery extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  photos: string[];

  @OneToOne(() => Salon, (salon) => salon.gallery)
  @Field(() => Salon, { nullable: true })
  @JoinColumn({
    name: "salon_id",
  })
  salon: Salon;
}
