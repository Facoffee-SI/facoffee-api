import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AboutService } from './about.service';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('about')
@ApiTags('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @ApiOperation({ summary: 'Cadastra o {Sobre Nós} da Empresa' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Body() createAboutUsDto: CreateAboutDto) {
    return this.aboutService.create(createAboutUsDto);
  }

  @ApiOperation({ summary: 'Busca o {Sobre Nós}da Empresa' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findAll() {
    return this.aboutService.findAll();
  }

  @ApiOperation({ summary: 'Cadastra o {Sobre Nós} da Empresa (customer)' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/customer')
  findAllForCustomer() {
    return this.aboutService.findAll();
  }

  @ApiOperation({ summary: 'Busca o {Sobre Nós} pelo ID' })
  @ApiBearerAuth('Autenticação JWT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aboutService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza o {Sobre Nós}' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAboutUsDto: UpdateAboutDto) {
    return this.aboutService.update(id, updateAboutUsDto);
  }

  @ApiOperation({ summary: 'Remove o {Sobre Nós}' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aboutService.remove(id);
  }
}
