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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const supabase_service_1 = require("../supabase/supabase.service");
const bcrypt = require("bcryptjs");
let AuthService = class AuthService {
    constructor(supabaseService, jwtService) {
        this.supabaseService = supabaseService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const { email, password, firstName, lastName, company, phone } = registerDto;
        const supabase = this.supabaseService.getClient();
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();
        if (existingUser) {
            return {
                success: false,
                message: 'User with this email already exists'
            };
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const { data: newUser, error: insertError } = await supabase
            .from('users')
            .insert({
            email,
            password: hashedPassword,
            first_name: firstName,
            last_name: lastName,
            company,
            phone: phone || null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        })
            .select()
            .single();
        if (insertError) {
            console.error('Database error:', insertError);
            return {
                success: false,
                message: 'Failed to create user'
            };
        }
        const token = this.jwtService.sign({ userId: newUser.id, email: newUser.email }, { expiresIn: '7d' });
        const { password: _, ...userWithoutPassword } = newUser;
        return {
            success: true,
            message: 'User registered successfully',
            user: userWithoutPassword,
            token
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const supabase = this.supabaseService.getClient();
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();
        if (userError || !user) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
        const token = this.jwtService.sign({ userId: user.id, email: user.email }, { expiresIn: '7d' });
        const { password: _, ...userWithoutPassword } = user;
        return {
            success: true,
            message: 'Login successful',
            user: userWithoutPassword,
            token
        };
    }
    async getProfile(userId) {
        const supabase = this.supabaseService.getClient();
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (error || !user) {
            return null;
        }
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async logout() {
        return {
            success: true,
            message: 'Logout successful'
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [supabase_service_1.SupabaseService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map