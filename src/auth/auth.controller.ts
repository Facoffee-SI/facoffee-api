import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-user.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/user/login')
  async loginUser(@Body() loginDto: LoginDto) {
    try {
      const user = await this.userService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      const token = await this.authService.generateTokenUser(user);
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
}
