import { UserDTO } from "../../userrDTO";
import { UserService } from "../../userService";

export class GetUserUseCase {
  constructor(private readonly userService: UserService) {}

  async execute(id: string): Promise<UserDTO> {
    const userFound = await this.userService.findOneUser(id);
    if (!userFound) {
      throw new Error('User not found');
    }

    const user = {
      _id: String(userFound._id),
      name: userFound.name,
      email: userFound.email,
      cpf: userFound.cpf,
      phone: userFound.phone || "",
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt
    };

    return user;
  }
}

export default GetUserUseCase;