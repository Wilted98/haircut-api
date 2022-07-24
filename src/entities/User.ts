import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";



@ObjectType()
@Entity()
export class User{

    @Field()
    @PrimaryKey()
    id!: number;

    @Field()
    @Property()
    name!: string;

    @Field()
    @Property({unique: true, type: 'text'},)
    email!: string


    @Field(() => String)
    @Property()
    createdAt? : Date =  new Date();
  
    @Field(() => String)
    @Property({ onUpdate: () => new Date() })
    updatedAt?: Date =  new Date();

    @Property({type: "text"})
    password!: string;



}