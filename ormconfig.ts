import * as dotenv from "dotenv";

dotenv.config();

export default {
  type: process.env.PG_TYPE || "postgres",
  host: process.env.PG_HOST || "localhost",
  port: parseInt(process.env.PORT) || 5432,
  username: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "postgres",
  database: process.env.PG_DATABASE || "postgres",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
};
