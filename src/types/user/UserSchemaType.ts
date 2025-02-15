export interface UserSchemaType {
    _id?: string;
    fullName?: string;
    mobile: string;
    otp: OTPType;
    verifyMobile: boolean;
    updatedAt?: Date;
    createdAt?: Date;
}

interface OTPType {
    code: number;
    expireIn: number;
}
