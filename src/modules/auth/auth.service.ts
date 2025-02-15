import { randomInt } from 'crypto';
import AuthMessage from './auth.message';
import { CustomStatusCodeEnum } from '../../enums/responseStatus.ts/CustomStatusCodeEnum';
import UserDataAccess from '../../dataAccess/user.dataAccess';
import { UserSchemaType } from '../../types/user/UserSchemaType';

class AuthService {
    private generateOtp(): UserSchemaType['otp'] {
        const nowData: number = new Date().getTime();
        return {
            code: randomInt(100000, 999999),
            expireIn: nowData + 1000 * 60 * 1, // 1 minute from nowData
        };
    }

    public async sendOtp(mobile: string): Promise<{ message: string; statusCode: CustomStatusCodeEnum; data: UserSchemaType['otp'] | null }> {
        const user: UserSchemaType | null = await UserDataAccess.SelectUserByMobile(mobile);

        const otpGenerate: UserSchemaType['otp'] = this.generateOtp();

        if (user === null) {
            await UserDataAccess.CreateUser(mobile, { mobile, otp: otpGenerate, verifyMobile: false });
            return {
                message: AuthMessage.newUserCreated,
                statusCode: CustomStatusCodeEnum.SUCCESS_CODE,
                data: otpGenerate,
            };
        } else if (user.otp && user.otp.expireIn > Date.now()) {
            return {
                message: AuthMessage.otpStillValid,
                statusCode: CustomStatusCodeEnum.WARNING_CODE,
                data: null,
            };
        } else {
            await UserDataAccess.UpdateUser(mobile, { otp: otpGenerate });
            return {
                message: AuthMessage.otpSent,
                statusCode: CustomStatusCodeEnum.SUCCESS_CODE,
                data: otpGenerate,
            };
        }
    }
}

export default new AuthService();
