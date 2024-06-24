import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Cadastra um novo Usuário.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Busca todos os Usuários' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Busca um Usuário.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.userAndRoles(id);
  }

  @ApiOperation({ summary: 'Atualiza um Usuário.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: CreateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Torna um Usuário como Administrador.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id/admin')
  makeAdmin(@Param('id') id: string) {
    return this.userService.makeAdmin(id);
  }

  @ApiOperation({ summary: 'Remove um Usuário.' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: 'Atualiza a imagem de perfil de um Usuário.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post('image/:userId')
  @UseInterceptors(FileInterceptor('profilePicture'))
  uploadFile(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Param('userId') userId: string,
  ) {
    return this.userService.sendProfilePicture(profilePicture, userId);
  }
}
