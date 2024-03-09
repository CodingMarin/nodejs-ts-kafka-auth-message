import "reflect-metadata";
import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

dotenv.config();

const {
  POSTGRES_URL,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DATABASE,
} = process.env;

const config = {
  type: "postgres",
  host: POSTGRES_URL,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DATABASE,
  synchronize: true,
  migrationsRun: false,
  dropSchema: false,
  entities: [join(__dirname, "/../**/*.entity.{js,ts}")],
  migrations: [join(__dirname, "/../migrations/*{js,ts}")],
  logging: false,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export const dataSource = new DataSource(<DataSourceOptions>config);
