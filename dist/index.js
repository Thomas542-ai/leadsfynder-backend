"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const compression = require("compression");
const app_module_1 = require("./app.module");
const logger_1 = require("./utils/logger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const logger = new logger_1.Logger('Bootstrap');
    app.use((0, helmet_1.default)());
    app.use(compression());
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://localhost:5173',
            'https://*.vercel.app',
            process.env.FRONTEND_URL,
        ].filter(Boolean),
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'X-Requested-With',
            'Accept',
            'Origin',
            'Access-Control-Request-Method',
            'Access-Control-Request-Headers',
        ],
        exposedHeaders: ['Content-Range', 'X-Content-Range'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.setGlobalPrefix('api', {
        exclude: ['/'],
    });
    app.use('/', (req, res) => {
        if (req.path === '/') {
            res.json({
                message: 'LeadsFynder Backend API - Root Route Working!',
                version: '1.0.0',
                status: 'running',
                timestamp: new Date().toISOString(),
                endpoints: {
                    health: '/api/health',
                    auth: '/api/auth',
                    leads: '/api/leads',
                    campaigns: '/api/campaigns',
                    analytics: '/api/analytics',
                    docs: '/api/docs'
                },
                documentation: 'Visit /api/docs for API documentation'
            });
        }
        else {
            res.status(404).json({
                message: 'Not Found',
                error: 'Not Found',
                statusCode: 404
            });
        }
    });
    const port = configService.get('PORT', 8000);
    await app.listen(port);
    logger.log(`🚀 LeadsFynder API is running on: http://localhost:${port}/api`);
    logger.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
}
bootstrap().catch((error) => {
    console.error('Failed to start application:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map