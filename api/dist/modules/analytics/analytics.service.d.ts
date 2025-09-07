import { SupabaseService } from '../supabase/supabase.service';
export declare class AnalyticsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    getLeadAnalytics(): Promise<{
        success: boolean;
        data: {
            totalLeads: number;
            newLeads: number;
            convertedLeads: number;
        };
    }>;
    getCampaignAnalytics(): Promise<{
        success: boolean;
        data: {
            totalCampaigns: number;
            activeCampaigns: number;
            sentEmails: number;
        };
    }>;
    getRevenueAnalytics(): Promise<{
        success: boolean;
        data: {
            totalRevenue: number;
            monthlyRevenue: number;
            growthRate: number;
        };
    }>;
}
