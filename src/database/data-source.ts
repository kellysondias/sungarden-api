import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: global.app_config.PG_TYPE as any,
  host: global.app_config.PG_HOST || "localhost",
  port: parseInt(global.app_config.PG_PORT) || 5432,
  username: global.app_config.PG_USER,
  password: global.app_config.PG_PASSWORD,
  database: global.app_config.PG_DATABASE,
  synchronize: true,
  logging: false,
  entities: ["./src/model/*.ts"],
  migrations: [],
  subscribers: [],
});
