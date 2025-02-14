import { Router } from 'express';

const route: Router = Router();
type authRoutes = Router;

route.use('/login', (req, res) => {
    console.log('asas');
});

export default route as authRoutes;
