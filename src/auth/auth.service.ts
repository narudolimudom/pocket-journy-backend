import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private blacklist: string[] = []
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // console.log("USER =>>", user)
    const payload = { email: user.email, sub: user.id, "name": user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async logout(token: string) {
    this.blacklist.push(token); // Blacklist the token (optional)
    return { message: 'Logged out successfully' };
  }

  isBlacklisted(token: string): boolean {
    return this.blacklist.includes(token); // Check if the token is blacklisted
  }
}
