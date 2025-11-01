export type defaultType = {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserDTO = defaultType & {
    name: string;
    email: string;
    cpf: string;
    phone?: string;
    id?: string;
};