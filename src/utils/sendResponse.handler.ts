import { Response } from 'express';

/**
 * ResponseHandler - A utility class for standardizing API responses
 *
 * Provides a consistent way to send HTTP responses with status codes, messages and optional results.
 * Used across the application to maintain uniform response structure.
 */

interface ResponseData {
    status: number;
    message: string;
    result: {} | null;
    requestDate: string;
    requestTime: string;
}

class ResponseHandler {
    static sendResponse(res: Response, statusCode: number, message: string, result: {} | null): void {
        const now = new Date();
        const response: ResponseData = {
            status: statusCode,
            message: message,
            result: result === null ? null : result,
            requestDate: now.toISOString().split('T')[0], // YYYY-MM-DD
            requestTime: now.toISOString().split('T')[1].split('Z')[0], // HH:MM:SS.sss
        };

        res.status(200).json(response);
    }
}

export default ResponseHandler;
