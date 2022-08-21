import { __prod__ } from "./constants";
import { User } from "./entities/User";
import path from "path";
import { Salon } from "./entities/Salon";
import { MikroORM } from "@mikro-orm/core";

export default {
  entities: [Salon, User],
  dbName: "haircut",
  user: "postgres",
  password: "123",
  type: "postgresql",
  debug: !__prod__,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    pattern: /^[\w-]+\d+\.[tj]s$/,
  },
  allowGlobalContext: true,
} as Parameters<typeof MikroORM.init>[0];
