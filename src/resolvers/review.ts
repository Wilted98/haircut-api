import { Review } from "../entities/Review";
import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
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
  salon_rating: number;
  @Field()
  @Length(1, 5)
  hairstylist_rating: number;
  @Field()
  user: number;
  @Field()
  salon: number;
}

@InputType()
class GetReviewsOptions {
  @Field()
  id: number;
  @Field()
  sortBy: string;
}

@Resolver()
export class reviewResolver {
  @Mutation(() => Review)
  async createReview(
    @Arg("options") options: ReviewOptions
  ): Promise<Review | null> {
    const review = await Review.create({
      postedBy: { id: options.postedBy },
      comment: options.comment,
      salon_rating: options.salon_rating,
      hairstylist_rating: options.hairstylist_rating,
      user: { id: options.user },
      salon: { id: options.salon },
    }).save();
    return review;
  }
  @Query(() => [Review], { nullable: true })
  async getReviews(
    @Arg("options") options: GetReviewsOptions
  ): Promise<Review[] | null> {
    const reviews = await Review.find({
      where: { salon: { id: options.id } },
      relations: { user: true, postedBy: true },
      order: { createdAt: options.sortBy === "oldest" ? "DESC" : "ASC" },
    });
    return reviews;
  }
}
