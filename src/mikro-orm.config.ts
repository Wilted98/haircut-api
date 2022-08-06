import { __prod__ } from "./constants";
import { User } from "./entities/User";
import path from "path";
import { Options } from "@mikro-orm/core";

export const config: Options = {
  entities: [User],
  type: "postgresql",
  dbName: "haircut",
  password: "123",
  user: "postgres",
  debug: __prod__,
  allowGlobalContext: true,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
};
