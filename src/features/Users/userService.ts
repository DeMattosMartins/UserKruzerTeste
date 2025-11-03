import { UserDTO } from './userrDTO';
import UserModel from './userModel';

export interface UpdateUserResponse{
    acknowledged: boolean;
    matchedCount: number;
    modifiedCount: number;
    upsertedId: string | null;
}

export interface DeleteUserResponse {
    deletedCount: number;
    acknowledged: boolean;
}

export class UserService {

    async findAllUsers(filters?: any): Promise<UserDTO[]> {  
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

    async findOneUser(id: string): Promise<any> {
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

    async createUser(user: UserDTO): Promise<Pick<UserDTO, 'name' | 'email' | 'cpf' | 'phone'>> {
            try {
                const userCreated = await UserModel.create(user);

                if (!userCreated) {
                    throw new Error('User not created');
                }

                const newUser: Pick<UserDTO, 'name' | 'email' | 'cpf' | 'phone'> = {
                    name: String(userCreated.name),
                    email: String(userCreated.email),
                    cpf: Number(userCreated.cpf),
                    phone: String(userCreated.phone)
                };

                return newUser;

            } catch (err) {
                throw new Error(String(err));
            }
    }

    async updateUser(user: UserDTO, id: string): Promise<UpdateUserResponse> {
        try {

                const userUpdated = await UserModel.updateOne({ _id: id }, user);
                return userUpdated as UpdateUserResponse;

            } catch (err) {
                throw new Error(String(err))
            }
    }

    async deleteUser(id: string): Promise<DeleteUserResponse> {
            try {
                const userDeleted = await UserModel.deleteOne({ _id: id });
                return userDeleted;

            } catch (err) {
                throw new Error(String(err))
            }
    }
}