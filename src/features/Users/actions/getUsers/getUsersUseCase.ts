import { UserDTO } from "../../userrDTO";
import { UserService } from "../../userService";

export class GetUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(filters: any = {}): Promise<UserDTO[]> {

    try {
      const usersFound = await this.userService.findAllUsers(filters);

      if (!usersFound) {
        throw new Error('Users not found');
      }

      return usersFound;
    } catch (err) {
      throw new Error(String(err));
    }
  }
}

export default GetUsersUseCase;