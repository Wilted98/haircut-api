import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Salon } from "./Salon";

enum userRole {
  USER = "user",
  HAIRSTYLIST = "hairstylist",
}

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column({
    type: "enum",
    enum: userRole,
    default: userRole.USER,
  })
  user_type?: userRole;

  @Field()
  @Column({ unique: true })
  email!: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @CreateDateColumn()
  updatedAt?: Date;

  @Column()
  password!: string;

  @ManyToOne(() => Salon, (salon) => salon.users)
  @Field(() => Salon, { nullable: true })
  salon: number;
}
