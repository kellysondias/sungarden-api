declare global {
  namespace NodeJS {
    interface Global {
      app_config: {
        PG_TYPE: string;
        PG_HOST: string;
        PG_PORT: string;
        PG_USER: string;
        PG_PASSWORD: string;
        PG_DATABASE: string;
        JWT_SECRET: string;
        JWT_EXPIRES: string;
      };
    }
  }
}
export {};
