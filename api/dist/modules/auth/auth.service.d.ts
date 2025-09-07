import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthService {
    private readonly supabaseService;
    private readonly jwtService;
    constructor(supabaseService: SupabaseService, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        success: boolean;
        message: string;
        user: any;
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        success: boolean;
        message: string;
        user?: undefined;
        token?: undefined;
    } | {
        success: boolean;
        message: string;
        user: any;
        token: string;
    }>;
    getProfile(userId: string): Promise<any>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
}
