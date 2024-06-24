import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('customer')
@ApiTags('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Cadastra um Customer.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post('/register')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @ApiOperation({ summary: 'Busca o Customer Logado (pelo token)' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('')
  findOne(@Req() req: Request) {
    const customerId = req['customerId'];
    return this.customerService.findOneOrFail(customerId);
  }

  @ApiOperation({ summary: 'Atualiza o Customer Logado (pelo token)' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch('')
  update(@Req() req: Request, @Body() updateCustomerDto: UpdateCustomerDto) {
    const customerId = req['customerId'];
    return this.customerService.update(customerId, updateCustomerDto);
  }

  @ApiOperation({ summary: 'Exclui a conta do Customer Logado (pelo token)' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete('')
  remove(@Req() req: Request) {
    const customerId = req['customerId'];
    return this.customerService.remove(customerId);
  }

  @ApiOperation({ summary: 'Atualiza a imagem de perfil do Customer' })
  @ApiBearerAuth('Autenticação JWT')
  @Post('image')
  @UseInterceptors(FileInterceptor('profilePicture'))
  uploadFile(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Req() req: Request,
  ) {
    const customerId = req['customerId'];
    return this.customerService.sendProfilePicture(profilePicture, customerId);
  }
}
