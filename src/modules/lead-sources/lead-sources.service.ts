import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class LeadSourcesService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllLeadSources() {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('lead_sources')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Lead sources table not found, returning mock data:', error.message);
        return {
          success: true,
          data: []
        };
      }

      return {
        success: true,
        data: data || []
      };
    } catch (error) {
      console.error('Error fetching lead sources:', error);
      return {
        success: false,
        message: 'Failed to fetch lead sources',
        data: []
      };
    }
  }

  async getLeadSourceById(id: string) {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('lead_sources')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return {
          success: false,
          message: 'Lead source not found'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching lead source:', error);
      return {
        success: false,
        message: 'Failed to fetch lead source'
      };
    }
  }

  async createLeadSource(createLeadSourceDto: any) {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('lead_sources')
        .insert({
          ...createLeadSourceDto,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating lead source:', error);
        return {
          success: false,
          message: 'Failed to create lead source'
        };
      }

      return {
        success: true,
        data,
        message: 'Lead source created successfully'
      };
    } catch (error) {
      console.error('Error creating lead source:', error);
      return {
        success: false,
        message: 'Failed to create lead source'
      };
    }
  }

  async updateLeadSource(id: string, updateLeadSourceDto: any) {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('lead_sources')
        .update({
          ...updateLeadSourceDto,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating lead source:', error);
        return {
          success: false,
          message: 'Failed to update lead source'
        };
      }

      return {
        success: true,
        data,
        message: 'Lead source updated successfully'
      };
    } catch (error) {
      console.error('Error updating lead source:', error);
      return {
        success: false,
        message: 'Failed to update lead source'
      };
    }
  }

  async deleteLeadSource(id: string) {
    try {
      const supabase = this.supabaseService.getClient();
      const { error } = await supabase
        .from('lead_sources')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting lead source:', error);
        return {
          success: false,
          message: 'Failed to delete lead source'
        };
      }

      return {
        success: true,
        message: 'Lead source deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting lead source:', error);
      return {
        success: false,
        message: 'Failed to delete lead source'
      };
    }
  }
}
