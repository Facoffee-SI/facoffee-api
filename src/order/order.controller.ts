import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('customer/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    const customerId: string = req['customerId'];
    console.log(customerId);
    const createOrderBody = {
      customerId: customerId,
      total: createOrderDto.total,
      situation: createOrderDto.situation,
    };
    return this.orderService.create(createOrderBody);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateOrderDto: UpdateOrderDto,
    @Req() req: Request,
  ) {
    const customerId: string = req['customerId'];
    console.log(customerId);
    const createOrderBody = {
      customerId: customerId,
      total: updateOrderDto.total,
      situation: updateOrderDto.situation,
    };
    return this.orderService.update(id, createOrderBody);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.orderService.remove(id);
  }
}
