import type { Express, Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CustomStatusCodeEnum } from '../enums/responseStatus.ts/CustomStatusCodeEnum';
import ResponseHandler from './sendResponse.handler';

interface AppError extends Error {
    status?: number;
    statusCode?: number;
    code?: number;
    errors?: Array<{ field: string; message: string }>;
}

class ErrorHandler {
    public notFoundRoute(app: Express) {
        app.use((req: Request, res: Response) => {
            res.status(404).json({
                status: 404,
                message: 'Not Found Route',
            });
        });
    }

    // // ErrorHandler For Duplicate Values (Unique)
    // public duplicateKeyError(app: Express) {
    //     const duplicateKeyErrorHandler: ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    //         if (err instanceof Error && 'code' in err && err.code === 11000 && 'keyValue' in err) {
    //             const keyValueObj = err.keyValue as Record<string, unknown>;
    //             const field = Object.keys(keyValueObj)[0];
    //             const value = keyValueObj[field];
    //             return ResponseHandler.sendResponse(res, CustomStatusCodeEnum.EXCEPTION_CODE, 'Duplicate key error', { field, value });
    //         } else {
    //             next(err);
    //         }
    //     };
    //     app.use(duplicateKeyErrorHandler);
    // }

    // Modify your allError method to pass unhandled errors to the next middleware
    public allError(app: Express) {
        const allErrorHandler: ErrorRequestHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
            let status = 500;

            if (err.name === 'CastError') {
                status = 400;
                res.status(status).json({
                    status: status,
                    message: err.message,
                });
                return;
            }

            if (err.status || err.statusCode || err.code) {
                status = err.status || err.statusCode || err.code || 500;
            }

            if (isNaN(status) || status > 511 || status < 200) {
                status = 500;
            }

            res.status(status).json({
                status: status,
                message: err.message || err.stack || 'Internal Server Error',
            });
        };

        app.use(allErrorHandler);
    }
}

export default new ErrorHandler();
