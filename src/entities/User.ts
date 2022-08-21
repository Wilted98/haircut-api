import {
  Entity,
  Enum,
  IdentifiedReference,
  ManyToOne,
  PrimaryKey,
  Property,
  Unique,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Salon } from "./Salon";

enum userRole {
  USER = "user",
  HAIRSTYLIST = "hairstylist",
}

@ObjectType()
@Entity()
export class User {
  @Field()
  @Unique()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  name!: string;

  @Field()
  @Enum(() => userRole)
  @Property()
  user_type?: string = userRole.USER;

  @Field()
  @Property({ unique: true, type: "text" })
  email!: string;

  @Field(() => String)
  @Property()
  createdAt?: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();

  @Property({ type: "text" })
  password!: string;

  @ManyToOne(() => Salon, { nullable: true, wrappedReference: true })
  @Field(() => Salon, { nullable: true })
  salon?: IdentifiedReference<Salon, "id">;
}
