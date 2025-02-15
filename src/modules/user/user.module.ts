import mongoose, { Schema } from 'mongoose';
import { UserSchemaType } from '../../types/user/UserSchemaType';

const UserSchema = new Schema<UserSchemaType>(
    {
        fullName: {
            type: String,
            required: false,
            unique: true,
            trim: true,
        },
        mobile: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (v: string) => /^\+98\d{10}$/.test(v),
                message: (props) => `${props.value} is not a valid mobile number. It should start with +98 and be exactly 13 characters long.`,
            },
        },
        otp: {
            code: { type: Number, required: false, default: undefined },
            expireIn: { type: Number, default: 0, required: false },
        },
        verifyMobile: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
const UserModel = mongoose.model<UserSchemaType>('User', UserSchema, 'users');
export default UserModel;
