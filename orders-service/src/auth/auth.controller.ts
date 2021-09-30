import { Get, Controller, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('token')
  async createToken(): Promise<any> {
    return await this.authService.createToken({ user: 'rosa' });
  }

  @Get('data')
  @UseGuards(AuthGuard())
  findAll() {
    console.log('Guarded endpoint');
  }
}
