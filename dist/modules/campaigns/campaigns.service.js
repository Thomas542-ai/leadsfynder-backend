"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CampaignsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let CampaignsService = class CampaignsService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
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
        }
        catch (error) {
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
        }
        catch (error) {
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
        }
        catch (error) {
            console.error('Error fetching SMTP configs:', error);
            return {
                success: false,
                message: 'Failed to fetch SMTP configs',
                data: []
            };
        }
    }
    async getCampaignById(id) {
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
        }
        catch (error) {
            console.error('Error fetching campaign:', error);
            return {
                success: false,
                message: 'Failed to fetch campaign'
            };
        }
    }
    async createCampaign(createCampaignDto) {
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
        }
        catch (error) {
            console.error('Error creating campaign:', error);
            return {
                success: false,
                message: 'Failed to create campaign'
            };
        }
    }
    async updateCampaign(id, updateCampaignDto) {
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
        }
        catch (error) {
            console.error('Error updating campaign:', error);
            return {
                success: false,
                message: 'Failed to update campaign'
            };
        }
    }
    async deleteCampaign(id) {
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
        }
        catch (error) {
            console.error('Error deleting campaign:', error);
            return {
                success: false,
                message: 'Failed to delete campaign'
            };
        }
    }
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], CampaignsService);
//# sourceMappingURL=campaigns.service.js.map