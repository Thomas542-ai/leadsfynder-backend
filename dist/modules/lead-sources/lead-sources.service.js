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
exports.LeadSourcesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let LeadSourcesService = class LeadSourcesService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
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
        }
        catch (error) {
            console.error('Error fetching lead sources:', error);
            return {
                success: false,
                message: 'Failed to fetch lead sources',
                data: []
            };
        }
    }
    async getLeadSourceById(id) {
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
        }
        catch (error) {
            console.error('Error fetching lead source:', error);
            return {
                success: false,
                message: 'Failed to fetch lead source'
            };
        }
    }
    async createLeadSource(createLeadSourceDto) {
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
        }
        catch (error) {
            console.error('Error creating lead source:', error);
            return {
                success: false,
                message: 'Failed to create lead source'
            };
        }
    }
    async updateLeadSource(id, updateLeadSourceDto) {
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
        }
        catch (error) {
            console.error('Error updating lead source:', error);
            return {
                success: false,
                message: 'Failed to update lead source'
            };
        }
    }
    async deleteLeadSource(id) {
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
        }
        catch (error) {
            console.error('Error deleting lead source:', error);
            return {
                success: false,
                message: 'Failed to delete lead source'
            };
        }
    }
};
exports.LeadSourcesService = LeadSourcesService;
exports.LeadSourcesService = LeadSourcesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], LeadSourcesService);
//# sourceMappingURL=lead-sources.service.js.map