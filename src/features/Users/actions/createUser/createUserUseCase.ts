import { UserDTO } from "../../userrDTO";
import { UserService } from "../../userService";

export class CreateUserUseCase {
    constructor(private readonly userService: UserService) {}

    async execute(user: UserDTO): Promise<{user: Pick<UserDTO, 'name' | 'email' | 'cpf' | 'phone'>}> {
        try {
            const userCreated = await this.userService.createUser(user);

            if (!userCreated) {
                throw new Error('User not created');
            }

            return {user: userCreated};

        } catch (err) {
            throw new Error(String(err));
        }
    }
}

export default CreateUserUseCase;