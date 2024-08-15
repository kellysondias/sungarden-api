import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { User } from "./entity/User";
import { ValidationResponse } from "./dto/user-response.dto";

class UsersService {
  private userRepository = AppDataSource.getRepository(User);

  async create(
    payload: User
  ): Promise<Partial<User> | ValidationResponse | null> {
    const user = this.userRepository.create(payload);
    const errors = await validate(user);

    if (errors.length > 0) {
      const formattedErrors = errors.map((err) => ({
        field: err.property,
        message: Object.values(err.constraints || {}).join(", "),
      }));

      return {
        status: "error",
        errors: formattedErrors,
      } as ValidationResponse;
    }

    const existingUser = await this.userRepository.findOneBy({
      email: payload.email,
    });

    if (existingUser) {
      return null;
    }

    const savedUser = await this.userRepository.save(user);
    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  private omitPassword(user: User): Omit<User, "password"> {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default new UsersService();
