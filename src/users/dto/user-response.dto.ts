import {User} from "../entity/User";

export interface ValidationError {
    field: string;
    message: string;
}

export interface ValidationResponse {
    status: string;
    errors: ValidationError[];
}

export class UserResponseDto {
    constructor(user: User) {
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
    }
    
    firstName: string;
    lastName: string;
    email: string;
}