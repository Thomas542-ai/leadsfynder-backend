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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_service_1 = require("../supabase/supabase.service");
let AnalyticsService = class AnalyticsService {
    constructor(supabaseService) {
        this.supabaseService = supabaseService;
    }
    async getLeadAnalytics() {
        return {
            success: true,
            data: {
                totalLeads: 0,
                newLeads: 0,
                convertedLeads: 0
            }
        };
    }
    async getCampaignAnalytics() {
        return {
            success: true,
            data: {
                totalCampaigns: 0,
                activeCampaigns: 0,
                sentEmails: 0
            }
        };
    }
    async getRevenueAnalytics() {
        return {
            success: true,
            data: {
                totalRevenue: 0,
                monthlyRevenue: 0,
                growthRate: 0
            }
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map