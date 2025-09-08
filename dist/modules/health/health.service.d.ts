import { SupabaseService } from '../supabase/supabase.service';
export declare class HealthService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
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
}
