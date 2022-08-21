import { Salon } from "../entities/Salon";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";

@Resolver()
export class salonResolver {
  @Mutation(() => Salon)
  async create(
    @Arg("name") name: string,
    @Ctx() { em }: MyContext
  ): Promise<Salon> {
    const salon = em.create(Salon, { name });

    await em.persistAndFlush(salon);

    return salon;
  }
}
