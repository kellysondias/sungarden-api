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
}
