import { SupabaseService } from '../supabase/supabase.service';
export declare class CampaignsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
    getAllCampaigns(): Promise<{
        success: boolean;
        data: any[];
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any[];
    }>;
    getEmailCampaigns(): Promise<{
        success: boolean;
        data: any[];
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any[];
    }>;
    getSMTPConfigs(): Promise<{
        success: boolean;
        data: any[];
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any[];
    }>;
    getCampaignById(id: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: any;
        message?: undefined;
    }>;
    createCampaign(createCampaignDto: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: any;
        message: string;
    }>;
    updateCampaign(id: string, updateCampaignDto: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: any;
        message: string;
    }>;
    deleteCampaign(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
