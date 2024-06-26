import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RolePermissionService } from 'src/role-permission/role-permission.service';
import { UserRoleEntity } from 'src/user-role/entities/user-role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(UserRoleEntity)
    private readonly userRoleRepository: Repository<UserRoleEntity>,
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const roleExists = await this.findByName(createRoleDto.name);
    if (roleExists) {
      throw new BadRequestException('Cargo já existe.');
    }

    await this.rolePermissionService.verifyPermissions(
      createRoleDto.permissionIds,
    );

    const role = await this.roleRepository.save(
      this.roleRepository.create(createRoleDto),
    );

    await this.rolePermissionService.create(
      role.id,
      createRoleDto.permissionIds,
    );

    return role;
  }

  async findAll() {
    const roles = await this.roleRepository.find();

    const rolesWithPermissions = await Promise.all(
      roles.map(async (role) => {
        const rolePermissions =
          await this.rolePermissionService.permissionsByRole(role.id);

        return {
          role,
          rolePermissions,
        };
      }),
    );

    return rolesWithPermissions;
  }

  async findOneOrFail(roleId: string) {
    try {
      return await this.roleRepository.findOneOrFail({ where: { id: roleId } });
    } catch (error) {
      throw new NotFoundException('Cargo não encontrado.');
    }
  }

  async rolesAndPermissions(roleId: string) {
    try {
      const role = await this.roleRepository.findOneOrFail({
        where: { id: roleId },
      });
      const rolePermissions =
        await this.rolePermissionService.permissionsByRole(roleId);

      return {
        role,
        rolePermissions,
      };
    } catch (error) {
      throw new NotFoundException('Cargo não encontrado.');
    }
  }

  async findOne(id: string) {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async findByName(name: string) {
    return await this.roleRepository.findOne({ where: { name } });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOneOrFail(id);
    const roleExists = await this.findByName(updateRoleDto.name);
    if (
      roleExists &&
      roleExists.name === updateRoleDto.name &&
      roleExists.id !== id
    ) {
      throw new BadRequestException('Cargo já existe.');
    }

    await this.rolePermissionService.verifyPermissions(
      updateRoleDto.permissionIds,
    );

    await this.rolePermissionService.recreate(
      role.id,
      updateRoleDto.permissionIds,
    );

    this.roleRepository.merge(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  async remove(id: string) {
    await this.findOneOrFail(id);

    const usersInRoleCount = await this.userRoleRepository.count({
      where: { roleId: id },
    });
    if (usersInRoleCount > 0) {
      throw new BadRequestException(
        'Cargo possui usuários associados. Não é possível deletar.',
      );
    }

    await this.rolePermissionService.removeByRoleId(id);
    await this.roleRepository.delete(id);
  }
}
