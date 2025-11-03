import { UserDTO } from "../../userrDTO";
import { UserService } from "../../userService";
import { UpdateUserResponse } from "../../userService";

export class UpdateUserUseCase {
    constructor(private readonly userService: UserService) {}

    async execute(user: UserDTO, id: string): Promise<UpdateUserResponse | Error> {
      
      try{
        // validate input
        if (!user.name || !user.email || !user.cpf || !user.phone) {
          throw new Error('User name, email, cpf and phone are required');
        }

        // Find user by cpf
        const findUserCpf = await this.userService.findAllUsers({cpf: user.cpf});
        if (findUserCpf.length > 0) {
          for (let i = 0; i < findUserCpf.length; i++) {
            if (findUserCpf[i].cpf === user.cpf && findUserCpf[i]._id.toString() !== id.toString()) {
              throw new Error('User whit this cpf already exists');
            }
          }
        }

        // Validate cpf
        const validatecpf = user.cpf;
          if (typeof validatecpf !== 'number') {
              throw new Error('CPF is not valid, it must be a number');
          }
          if (validatecpf.toString().length !== 11) {
              throw new Error('CPF is not valid, it must have 11 digits');
          } 

        // Find user by email
        const findUserEmail = await this.userService.findAllUsers({email: user.email});
        if (findUserEmail.length > 0) {
          for (let i = 0; i < findUserEmail.length; i++) {
            if (findUserEmail[i].email === user.email && findUserEmail[i]._id.toString() !== id.toString()) {
              throw new Error('User whit this email already exists');
            }
          }
        }

        // Validate email
        const validateEmail = user.email.split('@');
        if (validateEmail.length !== 2) {
            throw new Error('Email is not valid');
        }

        // Update user
        const userUpdated = await this.userService.updateUser(user, id);

        if (userUpdated.modifiedCount === 0 || !userUpdated) {
            throw new Error('User not updated');
        }

        return userUpdated;  
      } catch (err) {
          throw err;
      }
  }
}
export default UpdateUserUseCase;