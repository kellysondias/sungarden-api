import * as express from "express";
import { Request, Response } from "express";
import "./config/app.config";
import { AppDataSource } from "./database/data-source";
import { Routes } from "./routes";
import { loginAuth } from "./middlewares/auth";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    app.use(express.json());

    Routes.forEach((route) => {
      app[route.method](
        route.route,
        route.action !== "login" ? loginAuth : (req: Request, res: Response, next: Function) => next(),
        (req: Request, res: Response, next: Function) => {
          const controller = new (route.controller as any)();
          const result = controller[route.action](req, res, next);
          if (result instanceof Promise) {
            result.catch((err) => next(err)); // Captura erros da promessa e passa para o middleware de erro
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
