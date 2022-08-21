import {
  Entity,
  Property,
  PrimaryKey,
  OneToMany,
  Collection,
  Cascade,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";

@ObjectType()
@Entity()
export class Salon {
  @Field()
  @PrimaryKey()
  id!: number;

  @Field()
  @Property()
  name!: string;

  @Field()
  @Property({ type: "number" })
  rating?: number = 0;

  @OneToMany(() => User, (u: User) => u.salon, { cascade: [Cascade.ALL] })
  users = new Collection<User>(this);
}
