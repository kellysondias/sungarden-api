import {NextFunction, Request, Response} from "express";
import UsersService from "./user.service";
import {User} from "./entity/User";
import {UserResponseDto} from "./dto/user-response.dto";

export class UserController {
    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const users: User[] = await UsersService.findAll();
            if (!users) {
                return response.status(404).send("Users not found");
            }
            const userResponse: UserResponseDto[] = users.map(user => new UserResponseDto(user));
            return response.status(200).json(userResponse);
        } catch (error) {
            next(error);
        }
    }

    async byId(request: Request, response: Response, next: NextFunction) {
        try {
            const id: number = parseInt(request.params.id);
            if (!id) {
                return response.status(400).send("Invalid ID");
            }

            const user: User = await UsersService.findById(id);
            if (!user) {
                return response.status(404).send("User not found");
            }
            
            const userResponse: UserResponseDto = new UserResponseDto(user);
            return response.status(200).json(userResponse);
        } catch (error) {
            next(error);
        }
    }
}
