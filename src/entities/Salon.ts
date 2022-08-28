import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Service } from "./Service";

@ObjectType()
@Entity()
export class Salon extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column("int")
  rating?: number = 0;

  @OneToMany(() => User, (user) => user.salon)
  @Field(() => [User], { nullable: true })
  users: User[];

  @OneToMany(() => Service, (service) => service.salon, { onDelete: "CASCADE" })
  @Field(() => [Service], { nullable: true })
  services: Service[];
}
