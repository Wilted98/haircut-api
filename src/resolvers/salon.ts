import { Salon } from "../entities/Salon";
import { Arg, Mutation, Resolver } from "type-graphql";

@Resolver()
export class salonResolver {
  @Mutation(() => Salon)
  async createSalon(@Arg("name") name: string): Promise<Salon> {
    const salon = await Salon.create({
      name: name,
    }).save();

    return salon;
  }
}
