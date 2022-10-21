import { Salon } from "../entities/Salon";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { myDataSource } from "../app-data-source";
import { Review } from "src/entities/Review";

@Resolver()
export class salonResolver {
  @Mutation(() => Salon)
  async createSalon(@Arg("name") name: string): Promise<Salon> {
    const salon = await Salon.create({
      name: name,
    }).save();

    return salon;
  }

  @Query(() => Salon, { nullable: true })
  async getSalon(@Arg("id", () => Int) id: number): Promise<Salon | null> {
    const salon = await Salon.findOne({
      where: { id },
      relations: {
        services: true,
        users: true,
      },
    });
    return salon;
  }
  @Query(() => [Salon], { nullable: true })
  async getAllSalons(): Promise<Salon[]> {
    return await myDataSource.createQueryBuilder(Salon, "salon").getMany();
  }
}
