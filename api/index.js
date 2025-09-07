const { NestFactory } = require('@nestjs/core');
const { ValidationPipe } = require('@nestjs/common');
const { ConfigService } = require('@nestjs/config');
const helmet = require('helmet');
const compression = require('compression');
const { AppModule } = require('../dist/app.module');
const { Logger } = require('../dist/utils/logger');

let app;

async function createApp() {
  if (!app) {
    app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const logger = new Logger('Bootstrap');

    // Security middleware
    app.use(helmet());
    app.use(compression());

    // CORS configuration
    app.enableCors({
      origin: true,
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));

    // Global prefix
    app.setGlobalPrefix('api');

    await app.init();
  }
  return app;
}

module.exports = async (req, res) => {
  const nestApp = await createApp();
  return nestApp.getHttpAdapter().getInstance()(req, res);
};
