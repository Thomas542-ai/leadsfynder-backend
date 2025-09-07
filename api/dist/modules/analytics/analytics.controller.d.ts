import { AnalyticsService } from './analytics.service';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
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
