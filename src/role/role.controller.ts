import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: 'Cadastra um Cargo.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Busca todos os Cargos.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: 'Busca um Cargo pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.rolesAndPermissions(id);
  }

  @ApiOperation({ summary: 'Atualiza um Cargo.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: 'Remove um Cargo.' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
