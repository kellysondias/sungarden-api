import { AppDataSource } from "../database/data-source";
import { validate } from "class-validator";
import { User } from "../model/User";
import { ValidationResponse } from "../controllers/dto/validation.dto";
import { UserUpdateDTO } from "../controllers/dto/user-update.dto";
import { sign } from "jsonwebtoken";

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

  async update(id: number, newData: UserUpdateDTO): Promise<User> {
    const user = await this.findById(id);

    if (!user) return null;

    const updateUser = this.userRepository.merge(user, newData);

    return this.userRepository.save(updateUser);
  }

  async delete(id: number) {
    const user = await this.findById(id);

    if (!user) return false;

    const result = await this.userRepository.delete(user);

    return result.affected != null;
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) return null;

    if (user.password !== password) return null;

    return user;
  }

  async generateToken(user: User) {
    const token = sign({ id: user.id }, global.app_config.JWT_SECRET, {
      expiresIn: global.app_config.JWT_EXPIRES,
    });
    return token;
  }
}

export default new UsersService();
