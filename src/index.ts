import * as express from "express";
import {Request, Response} from "express"
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";

AppDataSource.initialize().then(async () => {

    const app = express();
    app.use(express.json()); // Pode usar express.json() ao invés de body-parser.json()

    // Itera sobre as rotas e define as rotas no Express
    Routes.forEach(route => {
        app[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const controller = new (route.controller as any)();
            const result = controller[route.action](req, res, next);
            if (result instanceof Promise) {
                result.catch(err => next(err)); // Captura erros da promessa e passa para o middleware de erro
            }
        });
    });

    app.listen(3000, () => {
        console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
    });

}).catch(error => console.log(error));
