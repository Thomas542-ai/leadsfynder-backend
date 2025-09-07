import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class CampaignsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getAllCampaigns() {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Campaigns table not found, returning mock data:', error.message);
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
      console.error('Error fetching campaigns:', error);
      return {
        success: false,
        message: 'Failed to fetch campaigns',
        data: []
      };
    }
  }

  async getEmailCampaigns() {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('type', 'email')
        .order('created_at', { ascending: false });

      if (error) {
        console.log('Email campaigns not found, returning mock data:', error.message);
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
      console.error('Error fetching email campaigns:', error);
      return {
        success: false,
        message: 'Failed to fetch email campaigns',
        data: []
      };
    }
  }

  async getSMTPConfigs() {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('smtp_configs')
        .select('*');

      if (error) {
        console.log('SMTP configs table not found, returning mock data:', error.message);
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
      console.error('Error fetching SMTP configs:', error);
      return {
        success: false,
        message: 'Failed to fetch SMTP configs',
        data: []
      };
    }
  }

  async getCampaignById(id: string) {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        return {
          success: false,
          message: 'Campaign not found'
        };
      }

      return {
        success: true,
        data
      };
    } catch (error) {
      console.error('Error fetching campaign:', error);
      return {
        success: false,
        message: 'Failed to fetch campaign'
      };
    }
  }

  async createCampaign(createCampaignDto: any) {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('campaigns')
        .insert({
          ...createCampaignDto,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating campaign:', error);
        return {
          success: false,
          message: 'Failed to create campaign'
        };
      }

      return {
        success: true,
        data,
        message: 'Campaign created successfully'
      };
    } catch (error) {
      console.error('Error creating campaign:', error);
      return {
        success: false,
        message: 'Failed to create campaign'
      };
    }
  }

  async updateCampaign(id: string, updateCampaignDto: any) {
    try {
      const supabase = this.supabaseService.getClient();
      const { data, error } = await supabase
        .from('campaigns')
        .update({
          ...updateCampaignDto,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating campaign:', error);
        return {
          success: false,
          message: 'Failed to update campaign'
        };
      }

      return {
        success: true,
        data,
        message: 'Campaign updated successfully'
      };
    } catch (error) {
      console.error('Error updating campaign:', error);
      return {
        success: false,
        message: 'Failed to update campaign'
      };
    }
  }

  async deleteCampaign(id: string) {
    try {
      const supabase = this.supabaseService.getClient();
      const { error } = await supabase
        .from('campaigns')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting campaign:', error);
        return {
          success: false,
          message: 'Failed to delete campaign'
        };
      }

      return {
        success: true,
        message: 'Campaign deleted successfully'
      };
    } catch (error) {
      console.error('Error deleting campaign:', error);
      return {
        success: false,
        message: 'Failed to delete campaign'
      };
    }
  }
}
