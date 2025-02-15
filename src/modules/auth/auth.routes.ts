import { Router } from 'express';
import authController from './auth.controller';

const route: Router = Router();
type authRoutes = Router;

route.post('/send-otp', authController.sendOtp);

export default route as authRoutes;
