import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "./entity/User";

export interface ServiceResponse {
  status: number;
  message: string;
  data?: any;
}

class UsersService {
  private userRepository = AppDataSource.getRepository(User);

  async findAll(): Promise<ServiceResponse> {
    const users = await this.userRepository.find();
    if (users.length === 0) {
      return { status: 404, message: "Users not found!" };
    }
    return { status: 200, message: "Users found", data: users };
  }
}

export default new UsersService();
