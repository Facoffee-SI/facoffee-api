import { Controller, Get, Post, Body, Param, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('customer/order')
@ApiTags('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Cadastra um Pedido' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    const customerId: string = req['customerId'];
    const createOrderBody = {
      customerId: customerId,
      total: createOrderDto.total,
      situation: createOrderDto.situation,
    };
    return this.orderService.create(createOrderBody);
  }

  @ApiOperation({ summary: 'Busca todos os Pedidos do Customer' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findAll(@Req() req: Request) {
    const customerId: string = req['customerId'];
    return this.orderService.findAllByCustomer(customerId);
  }

  @ApiOperation({ summary: 'Busca um Pedido pelo ID' })
  @ApiBearerAuth('Autenticação JWT')
  @Get(':id')
  findOne(@Req() req: Request, @Param('id') id: number) {
    const customerId: string = req['customerId'];
    return this.orderService.findOne(id, customerId);
  }
}
