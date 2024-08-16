import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { User } from "./entity/User";
import { ValidationResponse } from "./dto/user-response.dto";

interface newData {
  firstName: string;
  lastName: string;
  email: string;
}

class UsersService {
  private userRepository = AppDataSource.getRepository(User);

  async create(payload: User): Promise<User | ValidationResponse | null> {
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

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async update(id: number, newData: newData): Promise<User> {
    const user = await this.findById(id);

    if (!user) return null;

    const updateUser = this.userRepository.merge(user, newData);

    return this.userRepository.save(updateUser);
  }
}

export default new UsersService();
