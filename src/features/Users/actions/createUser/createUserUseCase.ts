import { UserDTO } from "../../userrDTO";
import { UserService } from "../../userService";

export class CreateUserUseCase {
    constructor(private readonly userService: UserService) {}

    async execute(user: UserDTO): Promise<{user: Pick<UserDTO, 'name' | 'email' | 'cpf' | 'phone'>}> {
        try {
            // validate input
            if (!user.name || !user.email || !user.cpf || !user.phone) {
            throw new Error('User name, email, cpf and phone are required');
            }

            // validate cpf 
            const userFoundCpf = await this.userService.findAllUsers({cpf: user?.cpf});
            if (userFoundCpf.length > 0) {
                throw new Error('User whit this cpf already exists');
            }

            const validatecpf = user?.cpf;
            if (typeof validatecpf !== 'number') {
                throw new Error('CPF is not valid, it must be a number');
            }
            if (validatecpf.toString().length !== 11) {
                throw new Error('CPF is not valid, it must have 11 digits');
            }

            // validate email
            const userFoundEmail = await this.userService.findAllUsers({email: user?.email});
            if (userFoundEmail.length > 0) {
                throw new Error('User whit this email already exists');
            }

            const validateEmail = user?.email.split('@');
            if (validateEmail.length !== 2) {
                throw new Error('Email is not valid');
            }

            // create user
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