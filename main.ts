import express, { Express } from 'express';
import swaggerConfig from './src/configs/swagger.config';
import mainRouter from './src/main.routes';
import errorHandler from './src/utils/error.handler';

const main = async (): Promise<void> => {
    const app: Express = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    require('./src/configs/mongoose.config');

    app.use(mainRouter);

    swaggerConfig(app);
    errorHandler.notFoundRoute(app);
    errorHandler.allError(app);
    app.listen(3000, () => {
        console.log(`Server is running on port 3000`, '||', ` http://localhost:3000/api-document`);
    });
};
main();
