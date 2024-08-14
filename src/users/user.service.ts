import {AppDataSource} from "../data-source";
import {User} from "./entity/User";

class UsersService {
    private userRepository = AppDataSource.getRepository(User);

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({
            id: id
        });
    }
}

export default new UsersService();
