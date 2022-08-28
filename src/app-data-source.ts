import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "postgres",
  username: "postgres",
  password: "123",
  database: "haircut",
  entities: ["./dist/entities/*.{ts,js}"],
  migrations: ["./src/migration/**/*.ts"],
  subscribers: ["./src/migration/**/*.ts"],
  logging: true,
  synchronize: true,
});
