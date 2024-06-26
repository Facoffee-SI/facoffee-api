import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('contact')
@ApiTags('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: 'Cadastra o contato da Empresa.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiOperation({ summary: 'Busca o contato da Empresa.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  find() {
    return this.contactService.find();
  }

  @ApiOperation({ summary: 'Cadastra o contato da Empresa (para customer).' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/customer')
  findAllForCustomer() {
    return this.contactService.find();
  }

  @ApiOperation({ summary: 'Atualiza o contato da Empresa.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @ApiOperation({ summary: 'Remove o contato da Empresa' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }
}
