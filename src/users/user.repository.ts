import { Repository } from "typeorm";
import { User } from "./entity/User";
import { CreateUserDto } from "./dto/create-user.dto";

export interface LoginResponse {
  id: string;
  token: string;
}

export class UsersService {
  constructor(private usersRepository: Repository<User>) {}

  async findAll(): Promise<User[] | null> {
    const users = await this.usersRepository.find();
    if (users.length === 0) {
      return null;
    }
    return users;
  }
}
