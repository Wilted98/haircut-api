import { Arg, Field, InputType, Mutation, Resolver, Query } from "type-graphql";
import { Gallery } from "../entities/Gallery";

@InputType()
class GalleryOptions {
  @Field()
  imageLink: string;

  @Field()
  salonID: number;
}

@Resolver()
export class galleryResolver {
  @Mutation(() => Gallery)
  async createGallery(
    @Arg("options") options: GalleryOptions
  ): Promise<Gallery | null> {
    const gallery = await Gallery.findOne({
      where: {
        salon: { id: options.salonID },
      },
    });

    if (gallery) {
      return Gallery.save({
        ...gallery,
        photos: [...gallery.photos, options.imageLink],
      });
    } else {
      return await Gallery.create({
        salon: { id: options.salonID },
        photos: [options.imageLink],
      }).save();
    }
  }
  @Query(() => Gallery, { nullable: true })
  async getGallery(@Arg("id") id: number): Promise<Gallery | null> {
    const gallery = await Gallery.findOne({
      where: { salon: { id: id } },
    });
    if (gallery) {
      return gallery;
    } else {
      return null;
    }
  }
}
