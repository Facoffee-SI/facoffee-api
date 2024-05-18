import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { PermissionModule } from 'src/permission/permission.module';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermissionEntity]), PermissionModule],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
