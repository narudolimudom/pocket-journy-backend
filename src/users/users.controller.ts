import { Controller, Post, Body, UseGuards, Get, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('name') name: string,
  ) {
    return this.usersService.createUser(email, password, name);
  }

  @UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
  @Get('profile')
  async getProfile(@Request() req) {
    // console.log(req)
    return req.user; // This will return the user information extracted from the JWT
  }
}
