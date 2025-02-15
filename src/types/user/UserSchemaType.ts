export interface UserSchemaType {
    _id: string;
    userName: string;
    mobile: string;
    email: string;
    password: string;
    confirmPassword: string;
    verify: boolean;
    updatedAt?: Date;
    createdAt?: Date;
}
