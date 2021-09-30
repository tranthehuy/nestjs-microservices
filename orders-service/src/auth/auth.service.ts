import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateUser(payload) {
    return { username: 'rosa' };
  }

  createToken(payload: any) {
    return this.jwtService.sign(payload);
  }
}
