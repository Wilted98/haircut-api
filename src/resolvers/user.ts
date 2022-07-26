import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Resolver,
  InputType,
  Query,
} from "type-graphql";
import { MyContext } from "src/types";
import argon2 from "argon2";
import { Salon } from "../entities/Salon";
import { userRole } from "../entities/User";
import { myDataSource } from "../app-data-source";
@InputType()
class UserRegisterOptions {
  @Field()
  username: string;
  @Field({})
  email: string;
  @Field()
  password: string;
  @Field({ nullable: true })
  salonId?: number;
  @Field({ nullable: true })
  user_type: userRole;
}

@ObjectType()
class ErrorsField {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class userResponse {
  @Field(() => [ErrorsField], { nullable: true })
  errors?: ErrorsField[];
  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class loginOptions {
  @Field()
  email: string;
  @Field()
  password: string;
}

@Resolver()
export class userResolver {
  @Mutation(() => userResponse)
  async register(
    @Arg("options") options: UserRegisterOptions,
    @Ctx() { req }: MyContext
  ): Promise<userResponse> {
    const errors = [];

    if (options.username.length <= 2) {
      errors.push({
        field: "Username",
        message: "Username is too short!",
      });
    }
    if (options.password.length <= 3) {
      errors.push({
        field: "Password",
        message: "Password is too short!",
      });
    }
    if (options.email.length <= 3) {
      errors.push({
        field: "Email",
        message: "Email is too short!",
      });
    }
    if (!options.email.includes("@")) {
      errors.push({
        field: "Email",
        message: "Invalid email!",
      });
    }

    if (errors.length > 0) {
      return {
        errors,
      };
    }

    const checkIfExists = await User.findOneBy({ email: options.email });

    if (checkIfExists) {
      return {
        errors: [
          {
            message: "This email is aleardy taken",
            field: "Email",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);

    if (options.salonId) {
      const salon = await Salon.findOne({ where: { id: options.salonId } });

      if (salon) {
        const user = await User.create({
          name: options.username,
          email: options.email,
          password: hashedPassword,
          salon,
          user_type: options.user_type,
        }).save();

        req.session.userId = user.id;
        return {
          user,
        };
      }
    }

    const user = await User.create({
      name: options.username,
      email: options.email,
      password: hashedPassword,
    }).save();

    req.session.userId = user.id;
    return {
      user,
    };
  }
  @Query(() => [User])
  async getUsers() {
    const users = await User.find({ relations: { salon: true } });

    return users;
  }
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    return await User.findOneBy({ id: req.session.userId });
  }
  @Mutation(() => userResponse)
  async login(
    @Ctx() { req }: MyContext,
    @Arg("options") options: loginOptions
  ): Promise<userResponse> {
    const user = await User.findOneBy({ email: options.email });

    if (!user) {
      return {
        user: undefined,
        errors: [{ field: "Email", message: "This user doesn't exists!" }],
      };
    }

    const checkPassword = await argon2.verify(user.password, options.password);

    if (checkPassword) {
      req.session.userId = user.id;
      return {
        errors: undefined,
        user,
      };
    } else {
      return {
        errors: [
          {
            message: "Invalid email or wrong password!",
            field: "Email",
          },
        ],
        user: undefined,
      };
    }
  }
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => String)
  async updateUserPicture(
    @Arg("id") id: number,
    @Arg("url") url: string
  ): Promise<String> {
    await myDataSource
      .createQueryBuilder()
      .update(User)
      .set({ profile_picture: url })
      .where("id = :id", { id })
      .execute();

    return url;
  }

  @Query(() => [User])
  async getAllHairStylists(): Promise<User[]> {
    const users = await User.find({
      relations: { salon: true, review: true },
      where: { user_type: userRole.HAIRSTYLIST },
    });
    users.forEach(
      (item) =>
        (item.rating =
          item.review.length > 0
            ? item.review.reduce(
                (prev, curr) => prev + curr.hairstylist_rating,
                0
              ) / item.review.length
            : 0)
    );
    return users;
  }
}
