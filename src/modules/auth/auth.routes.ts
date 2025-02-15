import { Router } from 'express';
import authController from './auth.controller';

const route: Router = Router();
type authRoutes = Router;

route.post('/login', authController.Login);

export default route as authRoutes;
