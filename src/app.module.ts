import { Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { UserRoleModule } from './user-role/user-role.module';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { MiddlewareBuilder } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { ContactModule } from './contact/contact.module';
import { PlanModule } from './plan/plan.module';
import { PlanProductModule } from './plan-product/plan-product.module';
import { AboutModule } from './about/about.module';
import { CustomerModule } from './customer/customer.module';
import { S3Service } from './s3/s3.service';
import { OrderModule } from './order/order.module';
import { SubscriptionModule } from './subscription/subscription.module';
import * as cors from 'cors';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST', 'localhost'),
        port: Number(configService.get('DB_PORT', 3306)),
        username: configService.get('DB_USERNAME', 'user'),
        password: configService.get('DB_PASSWORD', 'password'),
        database: configService.get('DB_DATABASE', 'facoffee'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    CategoryModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    UserRoleModule,
    RolePermissionModule,
    ProductModule,
    ContactModule,
    PlanModule,
    PlanProductModule,
    AboutModule,
    CustomerModule,
    OrderModule,
    SubscriptionModule,
  ],
  providers: [S3Service],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareBuilder) {
    consumer.apply(cors()).forRoutes('*');
  }
}
