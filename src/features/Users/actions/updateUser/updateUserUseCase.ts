import { UserDTO } from "../../userrDTO";
import { UserService } from "../../userService";

export class UpdateUserUseCase {
    constructor(private readonly userService: UserService) {}

    async execute(user: UserDTO, id: string): Promise<boolean | Error> {
      try{

        const userUpdated = await this.userService.updateUser(user, id);

        if (userUpdated instanceof Error) {
          throw userUpdated;
        }

        if (!userUpdated) {
          throw new Error('User not updated');
        }

        return true;  
      } catch (err) {
          throw err;
      }
  }
}
export default UpdateUserUseCase;