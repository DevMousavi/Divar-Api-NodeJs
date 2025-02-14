import { Response } from 'express';

/**
 * ResponseHandler - A utility class for standardizing API responses
 *
 * Provides a consistent way to send HTTP responses with status codes, messages and optional results.
 * Used across the application to maintain uniform response structure.
 *
 * @method sendResponse - Static method to send formatted HTTP responses
 * @param res - Express Response object
 * @param statusCode - HTTP status code for the response
 * @param message - Response message to be sent
 * @param result - Optional data/payload to be included in response
 *
 * Response Structure:
 * {
 *   status: number,
 *   message: string,
 *   result?: any
 * }
 */

interface ResponseData {
    status: number;
    message: string;
    result?: {};
}

class ResponseHandler {
    static sendResponse(res: Response, statusCode: number, message: string, result?: {}): void {
        const response: ResponseData = {
            status: statusCode,
            message: message,
        };

        if (result) {
            response.result = result;
        }

        res.status(200).json(response);
    }
}

export default ResponseHandler;
