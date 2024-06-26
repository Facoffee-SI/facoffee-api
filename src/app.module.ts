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
import { ReportModule } from './report/report.module';
import { AppController } from './app.controller';
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
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: Number(configService.get('DATABASE_PORT', 3306)),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE'),
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
    ReportModule,
  ],
  controllers: [AppController],
  providers: [S3Service],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareBuilder) {
    consumer.apply(cors()).forRoutes('*');
  }
}
