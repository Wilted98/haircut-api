import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Review } from "./Review";
import { Salon } from "./Salon";

export enum userRole {
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

  @Field({ nullable: true })
  @Column({ nullable: true, default: null })
  profile_picture?: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt?: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt?: Date;

  @Column()
  password!: string;

  @ManyToOne(() => Salon, (salon) => salon.users)
  @Field(() => Salon, { nullable: true })
  @JoinColumn({ name: "salon_id" })
  salon: Salon;

  @OneToMany(() => Review, (review) => review.user)
  @Field(() => [Review], { nullable: true })
  review: Review[];
}
