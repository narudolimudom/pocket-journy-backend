import { Controller, Post, UseGuards, Request, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth-guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // console.log("log =>>", req)
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req: Request) {
    const authHeader = req.headers['authorization']; // Use bracket notation
    if (!authHeader) {
      return { message: 'Authorization header is missing' };
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the 'Bearer <token>' format
    return this.authService.logout(token); // Invalidate the token
  }

}
