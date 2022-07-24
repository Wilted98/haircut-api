import { __prod__ } from "./constants";
import { User } from "./entities/User";
import path from "path";
import { Options } from "@mikro-orm/core";

export const config: Options = {
  entities: [User],
  dbName: "haircut",
  password: "123",
  type: "postgresql",
  debug: __prod__,
  allowGlobalContext: true,
  migrations: {
    path: path.join(__dirname, "./migrations"),
    glob: "!(*.d).{js,ts}",
  },
};
