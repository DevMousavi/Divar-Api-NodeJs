import jwt from 'jsonwebtoken';

const secret_key: string =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWE2YjdhZDU4NTg2N2VkYWE0ZDI0NSIsImlhdCI6MTczODIzNzE3NiwiZXhwIjoxNzM4MzIzNTc2fQ._M521whxTd6eeCj9hci79xRTGxmXMnmFv_HCWrjwHB0';

class JwtHandler {
    public createAccessToken(): string {
        return jwt.sign({}, secret_key, { expiresIn: '15m' });
    }

    public createRefreshToken(): string {
        return jwt.sign({}, secret_key, { expiresIn: '7d' });
    }

    public verifyToken(token: string): jwt.JwtPayload {
        return jwt.verify(token, secret_key) as jwt.JwtPayload;
    }

    public generateAccessTokenExpirationDate(): Date {
        return new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    }

    public generateRefreshTokenExpirationDate(): Date {
        return new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    }
}

export default new JwtHandler();
