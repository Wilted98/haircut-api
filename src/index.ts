import express from "express";
import { __prod__ } from "./constants";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { userResolver } from "./resolvers/user";
import { MyContext } from "./types";
import connectRedis from "connect-redis";
import session from "express-session";
import * as redis from "redis";
import { salonResolver } from "./resolvers/salon";
import { myDataSource } from "./app-data-source";
import { serviceResolver } from "./resolvers/service";
import { reviewResolver } from "./resolvers/review";
import cors from "cors";

const main = async () => {
  myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization", err);
    });

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    url: __prod__ ? "redis://redis:6379" : undefined,
    legacyMode: true,
  });
  await redisClient.connect();

  app.set("proxy", 1);

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
        disableTTL: true,
      }),
      saveUninitialized: false,
      secret: "my-secret",
      resave: false,
      name: "qid",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver, salonResolver, serviceResolver, reviewResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(6000, () => console.log("Server started!"));
};

main();
