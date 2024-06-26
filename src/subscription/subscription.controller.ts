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
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('customer/subscription')
@ApiTags('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @ApiOperation({ summary: 'Cadastra uma Assinatura.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(
    @Req() req: Request,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const customerId: string = req['customerId'];
    const createSubscriptionBody = {
      customerId: customerId,
      planId: createSubscriptionDto.planId,
      yearly: createSubscriptionDto.yearly,
    };
    return this.subscriptionService.create(createSubscriptionBody);
  }

  @ApiOperation({ summary: 'Busca uma Assinatura de um Customer.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findOne(@Req() req: Request) {
    const customerId: string = req['customerId'];
    return this.subscriptionService.findOne(customerId);
  }

  @ApiOperation({ summary: 'Atualiza uma Assinatura de um Customer.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @Req() req: Request,
  ) {
    const customerId: string = req['customerId'];
    const updateSubscriptionBody = {
      customerId: customerId,
      planId: updateSubscriptionDto.planId,
      yearly: updateSubscriptionDto.yearly,
    };
    return this.subscriptionService.update(id, updateSubscriptionBody);
  }

  @ApiOperation({ summary: 'Remove uma Assinatura de um Customer.' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete()
  async remove(@Req() req: Request) {
    const customerId: string = req['customerId'];
    return await this.subscriptionService.remove(customerId);
  }

  @ApiOperation({
    summary:
      'Todos os dias roda um Cron Job que verifica se a assinatura expirou e se sim a remove.',
  })
  @ApiBearerAuth('Autenticação JWT')
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  @Post('/expiration')
  expirationSubscriptions() {
    return this.subscriptionService.checkSubscriptionExpiration();
  }
}
