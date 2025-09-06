
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(id: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByLoginId(id);
    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { id: user.id, sub: user.user_no };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async updateProfilePicture(userId: number, file: Express.Multer.File): Promise<any> {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${userId}-${Date.now()}${path.extname(file.originalname)}`;
    const filePath = path.join(uploadDir, filename);

    await fs.promises.writeFile(filePath, file.buffer);

    // The update method now expects user_no, so we assume userId is the user_no
    const user = await this.usersService.update(userId, { profilePicture: `/uploads/${filename}` });
    return user;
  }
}
