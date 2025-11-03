import { UserService } from "../../userService";
import { DeleteUserResponse } from "../../userService";

export class DeleteUserUseCase {
    constructor(private readonly userService: UserService) {}

    async execute(id: string): Promise<DeleteUserResponse> {
        try {
            const deletedUser = await this.userService.deleteUser(id);

            if (!deletedUser) {
                throw new Error('User not found');
            }

            return deletedUser;
        } catch (err) {
            throw new Error(String(err));
        }
    }
}

export default DeleteUserUseCase;