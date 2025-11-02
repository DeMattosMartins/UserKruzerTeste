import { UserDTO } from './userrDTO';
import UserModel from './userModel';

export class UserService {

    async findAllUsers(filters?: any) {  
            try {
                const usersFound: UserDTO[] = await UserModel.find(filters);

                if (!usersFound) {
                   throw new Error('User not found');
                }
                
                return usersFound;
            } catch (err) {
                throw new Error(String(err));   
            }
    }

    async findOneUser(id: string) {
        try {
                const userFound = await UserModel.findOne({ _id: id });
                if (!userFound) {
                   throw new Error('User not found');
                }

                return userFound;
            } catch (err) {
                throw new Error(String(err));
            }
    }

    async createUser(user: UserDTO) {
            try {

                const userFound = await UserModel.findOne({cpf: user.cpf});

                if (userFound) {
                    throw new Error('User whit this cpf already exists');
                }

                const userCreated = await UserModel.create(user);

                if (!userCreated) {
                    throw new Error('User not created');
                }

                const newUser: Pick<UserDTO, 'name' | 'email' | 'cpf' | 'phone'> = {
                    name: userCreated.name,
                    email: userCreated.email,
                    cpf: userCreated.cpf,
                    phone: userCreated.phone || ""
                };

                return newUser;

            } catch (err) {
                throw new Error(String(err));
            }
    }

    async updateUser(user: UserDTO, id: string): Promise<{updatedUser: boolean}> {
        try {

                const userUpdated = await UserModel.updateOne({ _id: id }, user);

                if (userUpdated.modifiedCount === 0 || !userUpdated) {
                    throw new Error('User not updated');
                }

                return { updatedUser: true };

            } catch (err) {
                throw new Error(String(err))
            }
    }

    async deleteUser(id: string): Promise<boolean> {
            try {
                const userDeleted = await UserModel.deleteOne({ _id: id });

                if (!userDeleted.deletedCount) {
                    throw new Error('User not deleted');
                }

                return true;

            } catch (err) {
                throw new Error(String(err))
            }
    }
}