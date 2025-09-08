import { SupabaseService } from '../supabase/supabase.service';
export declare class LeadsService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
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
