export type defaultType = {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserDTO = defaultType & {
    name: string;
    email: string;
    cpf: number;
    phone?: string;
};