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

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('/register')
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @Get('')
  findOne(@Req() req: Request) {
    const customerId = req['customerId'];
    return this.customerService.findOneOrFail(customerId);
  }

  @Patch('')
  update(@Req() req: Request, @Body() updateCustomerDto: UpdateCustomerDto) {
    const customerId = req['customerId'];
    return this.customerService.update(customerId, updateCustomerDto);
  }

  @Delete('')
  remove(@Req() req: Request) {
    const customerId = req['customerId'];
    return this.customerService.remove(customerId);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('profilePicture'))
  uploadFile(
    @UploadedFile() profilePicture: Express.Multer.File,
    @Req() req: Request,
  ) {
    const customerId = req['customerId'];
    return this.customerService.sendProfilePicture(profilePicture, customerId);
  }

  @Get('image/')
  getProfilePicture(@Req() req: Request) {
    const customerId = req['customerId'];
    return this.customerService.getProfilePicture(customerId);
  }
}
