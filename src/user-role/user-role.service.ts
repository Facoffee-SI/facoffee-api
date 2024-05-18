import { Injectable } from '@nestjs/common';
import { UserRoleEntity } from './entities/user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
    private readonly roleService: RoleService,
  ) {}

  async create(userId: string, roleIds: [string]) {
    const userRoleEntities = roleIds.map((roleId) =>
      this.userRoleRepository.create({ userId, roleId }),
    );

    await this.userRoleRepository.save(userRoleEntities);
  }

  async verifyRoles(roleIds: [string]) {
    for (const roleId of roleIds) {
      await this.roleService.findOneOrFail(roleId);
    }
  }

  async findByUser(userId: string) {
    return await this.userRoleRepository.find({
      where: { userId: userId },
    });
  }

  async rolesByUser(userId: string) {
    const userRoles = await this.userRoleRepository.find({
      where: { userId: userId },
    });

    const rolesByUser = await Promise.all(
      userRoles.map(async (userRole) => {
        const role = await this.roleService.findOne(userRole.roleId);
        return { roleName: role.name, roleId: role.id };
      }),
    );

    return rolesByUser;
  }

  async removeByUserId(userId: string) {
    const userRoles = await this.findByUser(userId);
    const userRolesIds = userRoles.map((userRoleId) => userRoleId.id);

    await this.userRoleRepository.delete(userRolesIds);
  }

  async recreate(userId: string, roleIds: [string]) {
    await this.removeByUserId(userId);
    await this.create(userId, roleIds);
  }
}
