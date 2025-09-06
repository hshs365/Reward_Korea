
import { Controller, Request, Post, UseGuards, Body, UnauthorizedException, Get, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.id, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

        @UseGuards(AuthGuard('jwt'))
      @Get('me')
      getProfile(@Request() req) {
        // The JwtAuthGuard attaches the user object to the request
        // You might want to select specific fields to return for security/privacy
        const { password, ...result } = req.user; // Exclude password
        return result;
      }

      @UseGuards(AuthGuard('jwt'))
      @Post('profile-picture')
      @UseInterceptors(FileInterceptor('profilePicture')) // 'profilePicture' is the field name from the frontend FormData
      async uploadProfilePicture(@Request() req, @UploadedFile() file) {
        // Assuming authService has a method to handle updating the profile picture
        const updatedUser = await this.authService.updateProfilePicture(req.user.user_no, file);
        return { profilePictureUrl: updatedUser.profilePicture }; // Return the new URL
      }
    }
