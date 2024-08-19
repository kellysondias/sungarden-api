import { NextFunction, Request, Response } from "express";
import UsersService from "../services/user.service";
import { UserResponseDto } from "./dto/user-response.dto";

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

      const responseList: UserResponseDto[] = users.map(
        (user) => new UserResponseDto(user)
      );
      return res.status(200).json(responseList);
    } catch (error) {
      next(error);
    }
  }

  async update({ body, params }: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(params.id);

      if (body.password)
        return res
          .status(400)
          .json({ message: "Password update is not allowed" });

      const updatedUser = await UsersService.update(id, body);

      if (!updatedUser)
        return res.status(404).json({ message: "User not found" });

      return res.status(200).json({ message: "User was updated successfully" });
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

      const response: UserResponseDto = new UserResponseDto(user);
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete({ params }: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(params.id);

      if (isNaN(id)) return res.status(400).send("Invalid ID");

      const result = await UsersService.delete(id);

      if (!result) return res.status(404).send("User not found");

      return res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const user = await UsersService.login(email, password);

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = await UsersService.generateToken(user);
      req.headers.authorization = `Bearer ${token}`;
      return res.status(200).json({ email: user.email, token });
    } catch (error) {
      next(error);
    }
  }
}
