import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { Logger } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const logger = new Logger('Bootstrap');

  // Security middleware
  app.use(helmet());
  app.use(compression());

  // CORS configuration for Vercel frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // Local development
      'http://localhost:5173', // Vite dev server
      'https://*.vercel.app', // Vercel frontend domains
      process.env.FRONTEND_URL, // Production frontend URL
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

  // Global validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  // Global prefix for API routes
  app.setGlobalPrefix('api', {
    exclude: ['/'], // Exclude root route from API prefix
  });

  // Add a direct root route handler as fallback
  app.use('/', (req, res) => {
    if (req.path === '/') {
      res.json({
        message: 'LeadsFynder Backend API - Root Route Fixed!',
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
    } else {
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
