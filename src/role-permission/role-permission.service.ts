import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { Repository } from 'typeorm';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class RolePermissionService {
  constructor(
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
    private readonly permissionService: PermissionService,
  ) {}

  async verifyPermissions(permissionIds: [number]) {
    for (const permissionId of permissionIds) {
      await this.permissionService.findOneOrFail(permissionId);
    }
  }

  async create(roleId: string, permissionIds: [number]) {
    const rolePermissionEntities = permissionIds.map((permissionId) =>
      this.rolePermissionRepository.create({ roleId, permissionId }),
    );

    await this.rolePermissionRepository.save(rolePermissionEntities);
  }

  async findByRole(roleId: string) {
    return await this.rolePermissionRepository.find({
      where: { roleId: roleId },
    });
  }

  async permissionsByRole(roleId: string) {
    const rolePermissions = await this.rolePermissionRepository.find({
      where: { roleId: roleId },
    });

    const permissionsByRole = await Promise.all(
      rolePermissions.map(async (rolePermission) => {
        const permission = await this.permissionService.findOne(
          rolePermission.permissionId,
        );
        return {
          permissionId: permission.id,
          tableName: permission.tableName,
          action: permission.action,
        };
      }),
    );

    return permissionsByRole;
  }

  async removeByRoleId(roleId: string) {
    const rolePermissions = await this.findByRole(roleId);
    const rolePermissionIds = rolePermissions.map(
      (rolePermissionId) => rolePermissionId.id,
    );

    await this.rolePermissionRepository.delete(rolePermissionIds);
  }

  async recreate(roleId: string, permissionIds: [number]) {
    await this.removeByRoleId(roleId);
    await this.create(roleId, permissionIds);
  }
}
