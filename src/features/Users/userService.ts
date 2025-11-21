import { UserDTO } from './userrDTO';
import UserModel from './userModel';
import { DeleteResult, UpdateWriteOpResult } from 'mongoose';

export class UserService {

    async findAllUsers(filters?: any): Promise<UserDTO[]> {  
            try {
                return await UserModel.find(filters);
            } catch (err) {
                throw new Error(String(err));   
            }
    }

    async findOneUser(id: string): Promise<UserDTO | null> {
        try {
                return await UserModel.findOne({ _id: id });
            } catch (err) {
                throw new Error(String(err));
            }
    }

    async findAndModify(filters?: any, update?: any): Promise<UserDTO | null> {
        try {
            return await UserModel.findOneAndUpdate(filters, update);
        } catch (err) {
            throw new Error(String(err));
        }
    }

    async createUser(user: UserDTO): Promise<UserDTO> {
            try {  
                const userCreated = await UserModel.create(user);

                const newUser: UserDTO = {
                    _id: userCreated._id.toString(),
                    name: userCreated.name,
                    email: userCreated.email,
                    cpf: userCreated.cpf,
                    phone: userCreated.phone || "",
                    createdAt: userCreated.createdAt,
                    updatedAt: userCreated.updatedAt
                };

                return newUser;
            } catch (err) {
                throw new Error(String(err));
            }
    }

    async updateUser(user: UserDTO, id: string): Promise<UpdateWriteOpResult> {
        try {
                return await UserModel.updateOne({ _id: id }, user);
            } catch (err) {
                throw new Error(String(err));   
            }
    }

    async deleteMany(filters?: any): Promise<DeleteResult> {
        try {
            return await UserModel.deleteMany(filters);
        } catch (err) {
            throw new Error(String(err));
        }
    }

    async deleteUser(id: string): Promise<DeleteResult> {
            try {
                return await UserModel.deleteOne({ _id: id });
            } catch (err) {
                throw new Error(String(err));
            }
    }
}