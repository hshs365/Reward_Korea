import { Controller, Post, Body, ValidationPipe, HttpCode, Put, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UpdateUserDto } from './users/dto/update-user.dto'; // New import
import { AuthGuard } from '@nestjs/passport'; // Import AuthGuard

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log('Received data on backend:', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @Post('check-id') // Renamed from check-username
  @HttpCode(200)
  checkId(@Body('id') id: string) { // Renamed from checkUsername
    return this.usersService.checkId(id); // Renamed from checkUsername
  }

  @Post('check-email')
  @HttpCode(200)
  checkEmail(@Body('email') email: string) {
    return this.usersService.checkEmail(email);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('me')
  async updateProfile(@Request() req, @Body() updateData: UpdateUserDto) {
    // req.user is the full user object from JwtStrategy.validate
    // The user's primary key is now user_no
    const userNo = req.user.user_no; 
    const updatedUser = await this.usersService.update(userNo, updateData);
    return updatedUser;
  }
}
