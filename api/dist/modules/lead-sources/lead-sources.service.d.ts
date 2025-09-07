import { SupabaseService } from '../supabase/supabase.service';
export declare class LeadSourcesService {
    private readonly supabaseService;
    constructor(supabaseService: SupabaseService);
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
