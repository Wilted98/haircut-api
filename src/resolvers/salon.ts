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

  @Mutation(() => Salon, { nullable: true })
  async getSalonById(@Arg("id") id: number): Promise<Salon | null> {
    const salon = await Salon.findOne({
      where: { id },
      relations: {
        services: true,
        users: true,
      },
    });
    return salon;
  }
}
