import { Router } from 'express';
import authRoutes from '../src/modules/auth/auth.routes';

const route: Router = Router();
type mainRouter = Router;

route.use('/auth', authRoutes);

export default route as mainRouter;
