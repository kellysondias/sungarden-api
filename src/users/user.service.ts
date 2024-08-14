import {AppDataSource} from "../data-source";
import {User} from "./entity/User";

class UsersService {
    private userRepository = AppDataSource.getRepository(User);

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
}

export default new UsersService();
