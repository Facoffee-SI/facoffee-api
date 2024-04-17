import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './entities/role.entity';
import { RolePermissionModule } from 'src/role-permission/role-permission.module';
import { UserRoleEntity } from 'src/user-role/entities/user-role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity, UserRoleEntity]),
    RolePermissionModule,
  ],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
