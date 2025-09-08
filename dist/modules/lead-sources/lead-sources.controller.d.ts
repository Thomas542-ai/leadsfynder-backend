import { LeadSourcesService } from './lead-sources.service';
export declare class LeadSourcesController {
    private readonly leadSourcesService;
    constructor(leadSourcesService: LeadSourcesService);
    getAllLeadSources(): Promise<{
        success: boolean;
        data: any[];
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        data: any[];
    }>;
    getLeadSourceById(id: string): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: any;
        message?: undefined;
    }>;
    createLeadSource(createLeadSourceDto: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: any;
        message: string;
    }>;
    updateLeadSource(id: string, updateLeadSourceDto: any): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        data: any;
        message: string;
    }>;
    deleteLeadSource(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
