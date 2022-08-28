import { Service } from "../entities/Service";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Salon } from "../entities/Salon";

@InputType()
class ServiceOptions {
  @Field()
  name: string;
  @Field()
  price: number;
  @Field()
  salonID: number;
}

@Resolver()
export class serviceResolver {
  @Mutation(() => Service)
  async createService(
    @Arg("options") options: ServiceOptions
  ): Promise<Service | { message: string }> {
    const salon = await Salon.findOneBy({ id: options.salonID });

    if (salon) {
      return await Service.create({
        name: options.name,
        price: options.price,
        salon,
      }).save();
    }
    return { message: "This salon doesn't exists" };
  }
  @Query(() => [Service])
  async getServices(): Promise<Service[]> {
    return await Service.find({});
  }
}
