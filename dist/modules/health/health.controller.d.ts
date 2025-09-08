import { HealthService } from './health.service';
export declare class HealthController {
    private readonly healthService;
    constructor(healthService: HealthService);
    checkHealth(): Promise<{
        status: string;
        timestamp: string;
        message: string;
    }>;
    checkDatabase(): Promise<{
        status: string;
        message: string;
        timestamp: string;
        error?: undefined;
    } | {
        status: string;
        message: string;
        error: any;
        timestamp?: undefined;
    }>;
    checkRedis(): Promise<{
        status: string;
        message: string;
        timestamp: string;
    }>;
    testEndpoint(): Promise<{
        message: string;
        timestamp: string;
        status: string;
        endpoints: {
            health: string;
            database: string;
            redis: string;
            auth: string;
            leads: string;
            campaigns: string;
            analytics: string;
        };
    }>;
}
