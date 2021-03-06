import { Get, Controller, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async createToken(): Promise<any> {
    return await this.authService.createToken({ user: 'rosa' });
  }
}
