import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserRoleModule } from 'src/user-role/user-role.module';
import { AuthMiddleware } from './auth.middleware';
import { MiddlewareBuilder } from '@nestjs/core';
import { RolePermissionModule } from 'src/role-permission/role-permission.module';
import { CustomerModule } from 'src/customer/customer.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
    }),
    UserRoleModule,
    RolePermissionModule,
    CustomerModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
})
export class AuthModule {
  configure(consumer: MiddlewareBuilder) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        '/auth/user',
        '/auth/customer',
        '/customer/register',
        '/contact/customer',
        '/about/customer',
        '/product/customer',
        '/plan/customer',
      )
      .forRoutes('*');
  }
}
