import { CampaignsService } from './campaigns.service';
export declare class CampaignsController {
    private readonly campaignsService;
    constructor(campaignsService: CampaignsService);
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
