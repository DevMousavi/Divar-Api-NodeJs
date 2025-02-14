import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerConfig = (app: Express): void => {
    const swaggerDocumentation = swaggerJSDoc({
        swaggerDefinition: {
            openapi: '3.0.1',
            info: {
                title: 'ProjectName',
                version: 'v1',
                description: '',
                contact: {
                    name: 'Alireza Mousavi',
                    email: 'mousavi.dev@gmail.com',
                    url: 'https://github.com/DevMousavi',
                },
            },

            components: {
                securitySchemes: {
                    BearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
            security: [
                {
                    BearerAuth: [],
                },
            ],
        },
        apis: [process.cwd() + '/src/modules/**/*.swagger.ts'],
    });

    app.use('/api-document', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));
};

export default swaggerConfig;
