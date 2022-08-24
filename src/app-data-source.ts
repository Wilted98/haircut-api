import { DataSource } from "typeorm";

export const myDataSource = new DataSource({
  type: "postgres",
  username: "postgres",
  password: "123",
  database: "haircut",
  entities: ["./dist/entities/*.{ts,js}"],
  logging: true,
  synchronize: true,
});
