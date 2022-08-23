import { Salon } from "../entities/Salon";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class salonResolver {
  @Mutation(() => Salon)
  async create(@Arg("name") name: string): Promise<Salon> {
    const salon = await Salon.create({ name }).save();

    return salon;
  }
}
