/**
 * @swagger
 * /auth/send-otp:
 *   post:
 *     summary: Send OTP to mobile number
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendOtpInput'
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SendOtpInput:
 *       type: object
 *       required:
 *         - mobile
 *       properties:
 *         mobile:
 *           type: string
 *           description: Mobile number starting with +98 followed by 10 digits
 *           pattern: "^\\+98\\d{10}$"
 *           example: "+989123456789"
 */
