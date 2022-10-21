import { Review } from "../entities/Review";
import { Arg, Field, InputType, Mutation, Resolver } from "type-graphql";
import { Length } from "class-validator";

@InputType()
class ReviewOptions {
  @Field()
  postedBy: number;
  @Field()
  @Length(5, 200)
  comment: string;
  @Field()
  @Length(1, 5)
  rating: number;
  @Field()
  user: number;
  @Field()
  salon: number;
}

@Resolver()
export class reviewResolver {
  @Mutation(() => Review)
  async createReview(
    @Arg("options") options: ReviewOptions
  ): Promise<Review | null> {
    const review = await Review.create({
      postedBy: options.postedBy,
      comment: options.comment,
      rating: options.rating,
      user: { id: options.user },
      salon: { id: options.salon },
    }).save();
    return review;
  }
}
