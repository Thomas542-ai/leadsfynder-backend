import { LeadsService } from './leads.service';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    getAllLeads(): Promise<{
        success: boolean;
        data: any[];
    }>;
    getLeadById(id: string): Promise<{
        success: boolean;
        data: any;
    }>;
    createLead(createLeadDto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    updateLead(id: string, updateLeadDto: any): Promise<{
        success: boolean;
        data: any;
    }>;
    deleteLead(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
