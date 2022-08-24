import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
  users: User[];

  @ManyToMany(() => Service, (service) => service.salons)
  @JoinTable()
  services: Service[];
}
