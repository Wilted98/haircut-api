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

enum Currency {
  LEI = "LEI",
  EUR = "EUROS",
  DOLLARS = "DOLLARS",
}
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

  @Field()
  @Column({ default: 0 })
  duration!: number;

  @Field()
  @Column({
    type: "enum",
    enum: Currency,
    default: Currency.LEI,
  })
  currency!: Currency;

  @ManyToOne(() => Salon, (salon) => salon.services)
  @Field(() => Salon, { nullable: true })
  @JoinColumn({
    name: "salon_id",
  })
  salon: Salon;
}
