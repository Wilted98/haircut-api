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
import { Service } from "./entities/Service";

const main = async () => {
  myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error during Data Source initialization:", err);
    });

  const app = express();

  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({ legacyMode: true });
  await redisClient.connect();

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
        secure: __prod__,
        sameSite: "lax",
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [userResolver, salonResolver, serviceResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ req, res }),
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => console.log("Server started!"));
};

main();
