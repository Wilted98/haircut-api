import { DataSource } from "typeorm";
import { __prod__ } from "./constants";

export const myDataSource = new DataSource({
  type: "postgres",
  username: "postgres",
  password: "vasi123",
  database: "haircut",
  entities: ["./dist/entities/*.{ts,js}"],
  migrations: ["./dist/migrations/*.js"],
  subscribers: ["./dist/migrations/*.js"],
  logging: true,
  synchronize: true,
  url: __prod__
    ? "postgres://postgres:vasi123@postgres-haircut-docker:5432/haircut"
    : "postgres://postgres:vasi123@haircut.vpopescu.com:5432/haircut",
});
