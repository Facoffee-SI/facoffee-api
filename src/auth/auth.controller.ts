import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import { CustomerService } from 'src/customer/customer.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly customerService: CustomerService,
    private readonly authService: AuthService,
  ) {}

  @Post('/user')
  async loginUser(@Body() loginDto: LoginDto) {
    try {
      const user = await this.userService.validateUser(
        loginDto.email,
        loginDto.password,
      );
      const token = this.authService.generateTokenUser(user);
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }

  @Post('/customer')
  async loginCustomer(@Body() loginDto: LoginDto) {
    try {
      const customer = await this.customerService.validateCustomer(
        loginDto.email,
        loginDto.password,
      );
      const token = this.authService.generateTokenCustomer(customer);
      return { token };
    } catch (error) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
  }
}
