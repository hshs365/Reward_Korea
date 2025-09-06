import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(id: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    updateProfilePicture(userId: number, file: Express.Multer.File): Promise<any>;
}
