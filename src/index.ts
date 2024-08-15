import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { errorHandler } from "./errors/error.middleare";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());
    app.use(errorHandler);

    Routes.forEach((route) => {
      app[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const controller = new (route.controller as any)();
          const result = controller[route.action](req, res, next);
          if (result instanceof Promise) {
            result.catch((err) => next(err));
          }
        }
      );
    });

    app.listen(3000, () => {
      console.log(
        "Express server has started on port 3000. Open http://localhost:3000/users to see results"
      );
    });
  })
  .catch((error) => console.log(error));
