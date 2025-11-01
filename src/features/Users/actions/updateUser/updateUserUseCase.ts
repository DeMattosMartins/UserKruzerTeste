import { UserDTO } from "../../userrDTO";
import { UserService } from "../../userService";

export class UpdateUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(user: UserDTO): Promise<boolean | Error> {
    
    const userUpdated = await this.userService.updateUser(user, user.id!);

    if (!userUpdated) {
      return new Error('User not found');
    }

    return true;
  }
}

export default UpdateUserUseCase;