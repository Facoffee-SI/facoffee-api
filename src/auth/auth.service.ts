import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokenUser(user: UserEntity): string {
    const payload = { username: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }
}
