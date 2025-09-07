import { SupabaseService } from '../supabase/supabase.service';
export declare class CampaignsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    getAllCampaigns(): Promise<{
        success: boolean;
        data: any[];
    }>;
    getEmailCampaigns(): Promise<{
        success: boolean;
        data: any[];
    }>;
    getSMTPConfigs(): Promise<{
        success: boolean;
        data: any[];
    }>;
    getCampaignById(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
        };
    }>;
    createCampaign(createCampaignDto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    updateCampaign(id: string, updateCampaignDto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    deleteCampaign(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
