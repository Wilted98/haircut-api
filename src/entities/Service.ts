import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Salon } from "./Salon";

@ObjectType()
@Entity()
export class Service extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  ID!: number;

  @Field()
  @Column()
  service_name!: string;

  @Field()
  @Column("int")
  service_price!: number;

  @ManyToMany(() => Salon, (salon) => salon.services)
  salons: Salon[];
}
