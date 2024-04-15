import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRolePermissionDto } from './dto/create-role-permission.dto';
import { RolePermissionEntity } from './entities/role-permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(RolePermissionEntity)
    private readonly rolePermissionRepository: Repository<RolePermissionEntity>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.save(
      this.roleRepository.create(createRoleDto),
    );
  }

  async createRolePermission(createRolePermissionDto: CreateRolePermissionDto) {
    return await this.rolePermissionRepository.save(
      this.rolePermissionRepository.create(createRolePermissionDto),
    );
  }

  async findAll(): Promise<RoleEntity[]> {
    return await this.roleRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.roleRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Cargo não encontrado.');
    }
  }

  async findOne(id: string) {
    return await this.roleRepository.findOne({ where: { id } });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOneOrFail(id);

    this.roleRepository.merge(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }

  async remove(id: string) {
    await this.findOneOrFail(id);
    await this.roleRepository.softDelete(id);
  }
}
