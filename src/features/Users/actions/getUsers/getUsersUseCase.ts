import { UserDTO } from "../../userrDTO";
import { UserService } from "../../userService";

export class GetUsersUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(filters: any = {}): Promise<UserDTO[]> {
    return await this.userService.findAllUsers(filters);
  }
}

export default GetUsersUseCase;