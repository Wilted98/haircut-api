import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Salon } from "./Salon";

@ObjectType()
@Entity()
export class Service extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column("int")
  price!: number;

  @ManyToOne(() => Salon, (salon) => salon.services)
  @Field(() => Salon, { nullable: true })
  @JoinColumn({
    name: "salon_id",
  })
  salon: Salon;
}
