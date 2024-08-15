import { NextFunction, Request, Response } from "express";
import UsersService from "./user.service";

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body;
      const result = await UsersService.create(user);

      if (result && "errors" in result) {
        return res.status(400).json(result);
      }

      if (!result) {
        return res.status(400).json({
          status: "error",
          errors: [
            { field: "email", message: "User with this email already exists" },
          ],
        });
      }

      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ status: "error", message: error.message });
    }
  }

  async all(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UsersService.findAll();
      if (!users) {
        return res.status(404).send("Users not found");
      }
      return res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  async byId(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).send("Invalid ID");
      }

      const user = await UsersService.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }

      return res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  async update({ body, params }: Request, res: Response, next: NextFunction) {
    try {
      const id = params.id;

      const { firstName, lastName, email, password } = body;

      if (password || email) {
        return res
          .status(400)
          .json({
            message: `${
              password ? "Password" : "E-mail"
            } update is not allowed`,
          });
      }

      const userData = { firstName, lastName };

      //const updatedUser = await UsersService.(id, userData);

      // if (!updatedUser) {
      //   return res.status(404).send("User not found");
      // }

      return res.status(200).send("User was updated successfully");
    } catch (error) {
      next(error);
    }
  }
}
