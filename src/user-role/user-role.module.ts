import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRoleEntity } from './entities/user-role.entity';
import { RoleModule } from 'src/role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRoleEntity]), RoleModule],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModule {}
