import userDataAccess from '../../dataAccess/user.dataAccess';
import ResponseHandler from '../../utils/sendResponse.handler';
import LoginDto from './dtos/login.dto';
import AuthMessage from './auth.message';
import jwtHandler from '../../utils/jwt.handler';
import { NextFunction, Request, Response } from 'express';
import { UserSchemaType } from '../../types/user/UserSchemaType';
import { CustomStatusCodeEnum } from '../../enums/responseStatus.ts/CustomStatusCodeEnum';

class AuthController {
    public Login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const loginData: LoginDto = LoginDto.create(req.body);

            const user: UserSchemaType | null = await userDataAccess.SelectUserByUserName(loginData.userName);

            if (!user) {
                return ResponseHandler.sendResponse(res, CustomStatusCodeEnum.WARNING_CODE, AuthMessage.NotFoundUser, null);
            } else {
                if (loginData.password !== user.password) {
                    return ResponseHandler.sendResponse(res, CustomStatusCodeEnum.WARNING_CODE, 'Password or UserName is incorrect', null);
                } else {
                    return ResponseHandler.sendResponse(res, CustomStatusCodeEnum.SUCCESS_CODE, 'Login Successfully', {
                        result: {
                            userName: user.userName,
                            accessToken: jwtHandler.createAccessToken(),
                            expireAtAccessToken: jwtHandler.generateAccessTokenExpirationDate(),
                            refreshToken: jwtHandler.createRefreshToken(),
                            expireAtRefreshToken: jwtHandler.generateRefreshTokenExpirationDate(),
                        },
                    });
                }
            }
        } catch (error) {
            next(error);
        }
    };
}

export default new AuthController();
