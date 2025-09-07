import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot() {
    return {
      message: 'LeadsFynder Backend API',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        health: '/api/health',
        auth: '/api/auth',
        leads: '/api/leads',
        campaigns: '/api/campaigns',
        analytics: '/api/analytics',
        docs: '/api/docs'
      },
      documentation: 'Visit /api/docs for API documentation'
    };
  }
}
