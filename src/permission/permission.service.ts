import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ActionEnum, PermissionEntity } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async create(createPermissionDto: CreatePermissionDto) {
    if (!Object.values(ActionEnum).includes(createPermissionDto.action)) {
      throw new BadRequestException(
        'Ação inválida, escolha entre essas: CREATE, READ, UPDATE, DELETE.',
      );
    }

    return await this.permissionRepository.save(
      this.permissionRepository.create(createPermissionDto),
    );
  }

  async findAll(): Promise<PermissionEntity[]> {
    return await this.permissionRepository.find();
  }

  async findOneOrFail(id: number) {
    try {
      return await this.permissionRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Permissão não encontrada.');
    }
  }

  async findOne(id: number) {
    return await this.permissionRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.findOneOrFail(id);

    this.permissionRepository.merge(permission, updatePermissionDto);
    return await this.permissionRepository.save(permission);
  }

  async remove(id: number) {
    await this.findOneOrFail(id);
    await this.permissionRepository.delete(id);
  }
}
