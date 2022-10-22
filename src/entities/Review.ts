import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Salon } from "./Salon";

@ObjectType()
@Entity()
export class Review extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  postedBy: number;

  @Field()
  @Column()
  comment: string;

  @Field()
  @Column("int")
  salon_rating: number;

  @Field()
  @Column("int")
  hairstylist_rating: number;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;

  @ManyToOne(() => User, (user) => user.review)
  @Field(() => User, { nullable: true })
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @ManyToOne(() => Salon, (salon) => salon.review)
  @Field(() => Salon, { nullable: true })
  @JoinColumn({
    name: "salon_id",
  })
  salon: Salon;
}
