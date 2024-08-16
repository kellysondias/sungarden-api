import { config } from "dotenv";

config();

global.app_config = {
  PG_TYPE: "",
  PG_HOST: "",
  PG_PORT: "",
  PG_USER: "",
  PG_PASSWORD: "",
  PG_DATABASE: "",
};

Object.keys(global.app_config).forEach((key) => {
  const value: string = process.env[key] || "";
  if (!value) {
    throw new Error(`Missing environment variable ${key}`);
  }
  global.app_config[key as keyof typeof global.app_config] = value;
});
