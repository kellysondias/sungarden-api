import { AppDataSource } from "../data-source";
import { validate } from "class-validator";
import { User } from "./entity/User";
import { ValidationResponse } from "./dto/user-response.dto";

class UsersService {
  private userRepository = AppDataSource.getRepository(User);

  async create(payload: User): Promise<User | ValidationResponse | null> {
    // Validação do payload
    const user = this.userRepository.create(payload);
    const errors = await validate(user);

    if (errors.length > 0) {
      // Formatar e retornar erros de validação
      const formattedErrors = errors.map((err) => ({
        field: err.property,
        message: Object.values(err.constraints || {}).join(", "),
      }));

      return {
        status: "error",
        errors: formattedErrors,
      } as ValidationResponse;
    }

    // Verificar se o usuário já existe
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
}

export default new UsersService();
