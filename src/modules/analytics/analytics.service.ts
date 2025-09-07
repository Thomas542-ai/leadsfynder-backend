import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable()
export class AnalyticsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getLeadAnalytics() {
    try {
      const supabase = this.supabaseService.getClient();
      
      // Get total leads
      const { count: totalLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      // Get new leads (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const { count: newLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Get converted leads
      const { count: convertedLeads } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'converted');

      return {
        success: true,
        data: {
          totalLeads: totalLeads || 0,
          newLeads: newLeads || 0,
          convertedLeads: convertedLeads || 0
        }
      };
    } catch (error) {
      console.error('Error fetching lead analytics:', error);
      return {
        success: true,
        data: {
          totalLeads: 0,
          newLeads: 0,
          convertedLeads: 0
        }
      };
    }
  }

  async getCampaignAnalytics() {
    try {
      const supabase = this.supabaseService.getClient();
      
      // Get total campaigns
      const { count: totalCampaigns } = await supabase
        .from('campaigns')
        .select('*', { count: 'exact', head: true });

      // Get active campaigns
      const { count: activeCampaigns } = await supabase
        .from('campaigns')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      // Get sent emails (mock data for now)
      const sentEmails = 0;

      return {
        success: true,
        data: {
          totalCampaigns: totalCampaigns || 0,
          activeCampaigns: activeCampaigns || 0,
          sentEmails
        }
      };
    } catch (error) {
      console.error('Error fetching campaign analytics:', error);
      return {
        success: true,
        data: {
          totalCampaigns: 0,
          activeCampaigns: 0,
          sentEmails: 0
        }
      };
    }
  }

  async getRevenueAnalytics() {
    try {
      const supabase = this.supabaseService.getClient();
      
      // Get revenue data (mock for now - you can implement actual revenue tracking)
      const totalRevenue = 0;
      const monthlyRevenue = 0;
      const growthRate = 0;

      return {
        success: true,
        data: {
          totalRevenue,
          monthlyRevenue,
          growthRate
        }
      };
    } catch (error) {
      console.error('Error fetching revenue analytics:', error);
      return {
        success: true,
        data: {
          totalRevenue: 0,
          monthlyRevenue: 0,
          growthRate: 0
        }
      };
    }
  }
}
