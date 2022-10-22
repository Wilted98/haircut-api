import { Salon } from "../entities/Salon";
import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { myDataSource } from "../app-data-source";

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
    const salons = await myDataSource
      .createQueryBuilder(Salon, "salon")
      .leftJoinAndSelect("salon.review", "review")
      .getMany();
    salons.forEach(
      (item) =>
        (item.rating =
          item.review.reduce((prev, curr) => prev + curr.salon_rating, 0) /
          item.review.length)
    );
    return salons;
  }
}
