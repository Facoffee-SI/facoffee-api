import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('permission')
@ApiTags('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: 'Cadastra uma Permissão.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @ApiOperation({ summary: 'Busca todas as Permissões.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @ApiOperation({ summary: 'Busca uma Permissão pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.permissionService.findOneOrFail(id);
  }

  @ApiOperation({ summary: 'Atualiza uma Permissão pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.permissionService.update(id, updatePermissionDto);
  }

  @ApiOperation({ summary: 'Remove uma Permissão pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.permissionService.remove(id);
  }
}
