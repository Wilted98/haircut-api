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

@InputType()
class UserRegisterOptions {
  @Field()
  username: string;
  @Field({})
  email: string;
  @Field()
  password: string;
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
    @Ctx() { em, req }: MyContext
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

    const checkIfExists = await em.findOne(User, { email: options.email });

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

    const user = em.create(User, {
      name: options.username,
      email: options.email,
      password: hashedPassword,
    });

    await em.persistAndFlush(user);
    req.session.userId = user.id;
    return {
      user,
    };
  }
  @Query(() => [User])
  async getUsers(@Ctx() { em }: any) {
    const users = em.find(User, {});

    return users;
  }
  @Query(() => User, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }
    const me = await em.findOne(User, { id: req.session.userId });

    return me;
  }
  @Mutation(() => userResponse)
  async login(
    @Ctx() { em, req }: MyContext,
    @Arg("options") options: loginOptions
  ): Promise<userResponse> {
    const user = await em.findOne(User, { email: options.email });

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
            message: "Invalid email or password!",
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
}
