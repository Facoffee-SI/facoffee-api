import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { UserRoleModule } from 'src/user-role/user-role.module';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserRoleModule],
  controllers: [UserController],
  providers: [UserService, S3Service],
  exports: [UserService],
})
export class UserModule {}
