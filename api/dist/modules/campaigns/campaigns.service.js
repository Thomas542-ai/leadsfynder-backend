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
        return {
            success: true,
            data: []
        };
    }
    async getEmailCampaigns() {
        return {
            success: true,
            data: []
        };
    }
    async getSMTPConfigs() {
        return {
            success: true,
            data: []
        };
    }
    async getCampaignById(id) {
        return {
            success: true,
            data: { id }
        };
    }
    async createCampaign(createCampaignDto) {
        return {
            success: true,
            data: createCampaignDto
        };
    }
    async updateCampaign(id, updateCampaignDto) {
        return {
            success: true,
            data: { id, ...updateCampaignDto }
        };
    }
    async deleteCampaign(id) {
        return {
            success: true,
            message: 'Campaign deleted successfully'
        };
    }
};
exports.CampaignsService = CampaignsService;
exports.CampaignsService = CampaignsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], CampaignsService);
//# sourceMappingURL=campaigns.service.js.map