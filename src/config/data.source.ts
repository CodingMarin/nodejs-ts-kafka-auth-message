import "reflect-metadata";
import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

const config = {
  type: "postgres",
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  synchronize: false,
  migrationsRun: true,
  dropSchema: false,
  entities: [join(__dirname, "/../**/*.entity.{js,ts}")],
  migrations: [join(__dirname, "/../migrations/*{js,ts}")],
  logging: false,
  ssl: false,
};

export const dataSource = new DataSource(<DataSourceOptions>config);
