import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from 'src/user-role/user-role.service';
import { RolePermissionService } from 'src/role-permission/role-permission.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  generateTokenUser(user: UserEntity): string {
    const payload = {
      userId: user.id,
    };
    return this.jwtService.sign(payload);
  }

  async loadUserInformation(userId: string) {
    const user = await this.userService.findOneOrFail(userId);
    const userRoles = await this.userRoleService.findByUser(user.id);
    const roleIds = userRoles.map((userRoleId) => userRoleId.roleId);

    return {
      user,
      roleIds,
    };
  }

  async hasPermission(decodeToken: any, request: any): Promise<boolean> {
    const { userId } = decodeToken;
    const { user, roleIds } = await this.loadUserInformation(userId);
    const { method, baseUrl } = request;

    const baseUrlParts = baseUrl.split('/');
    if (baseUrlParts.includes('admin')) {
      return user.isAdmin;
    }
    const tableName = baseUrlParts[1];

    if (user.isAdmin) {
      return true;
    }

    try {
      const roles = await Promise.all(
        roleIds.map((roleId: string) =>
          this.rolePermissionService.permissionsByRole(roleId),
        ),
      );

      for (const permissions of roles) {
        for (const permission of permissions) {
          if (
            permission.action === method &&
            permission.tableName === tableName
          ) {
            return true;
          }
        }
      }
    } catch (error) {
      console.error('Erro ao buscar permissões por função:', error);
      return false;
    }

    return false;
  }
}
