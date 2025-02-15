import ResponseHandler from '../../utils/sendResponse.handler';
import { NextFunction, Request, Response } from 'express';
import SendOtpDto from './dtos/sendOtp.dto';
import authService from './auth.service';

class AuthController {
    public sendOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const sendOtpData: SendOtpDto = SendOtpDto.create(req.body);
            const result = await authService.sendOtp(sendOtpData.mobile);

            return ResponseHandler.sendResponse(res, result.statusCode, result.message, result.data);
        } catch (error) {
            next(error);
        }
    };
}

export default new AuthController();
