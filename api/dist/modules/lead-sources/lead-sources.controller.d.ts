import { LeadSourcesService } from './lead-sources.service';
export declare class LeadSourcesController {
    private readonly leadSourcesService;
    constructor(leadSourcesService: LeadSourcesService);
    getAllLeadSources(): Promise<{
        success: boolean;
        data: any[];
    }>;
    getLeadSourceById(id: string): Promise<{
        success: boolean;
        data: {
            id: string;
        };
    }>;
    createLeadSource(createLeadSourceDto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    updateLeadSource(id: string, updateLeadSourceDto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    deleteLeadSource(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
