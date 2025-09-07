import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
    getProfile(req: any): Promise<{
        success: boolean;
        user: any;
    }>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
}
