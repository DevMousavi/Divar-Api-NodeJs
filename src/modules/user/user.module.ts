import mongoose, { Schema } from 'mongoose';
import { UserSchemaType } from '../../types/user/UserSchemaType';

const UserSchema = new Schema<UserSchemaType>(
    {
        userName: {
            type: String,
            required: true,
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
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
                message: (props) => `${props.value} is not a valid email address.`,
            },
        },
        password: {
            type: String,
            required: true,
            validate: {
                validator: (v: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(v),
                message: (props) =>
                    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character. It must be in English and at least 8 characters long.',
            },
        },
        confirmPassword: {
            type: String,
            required: true,
            validate: {
                validator: function (this: UserSchemaType, v: string) {
                    return v === this.password;
                },
                message: 'Passwords do not match.',
            },
        },
        verify: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
const UserModel = mongoose.model<UserSchemaType>('User', UserSchema, 'users');
export default UserModel;
