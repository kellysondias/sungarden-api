import { NextFunction, Request, Response } from "express";
import UsersService from "./user.service";

export class UserController {
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      return await UsersService.findAll();
    } catch (error) {
      next(error);
    }
  }
}
