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

@Controller('customer/subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(
    @Req() req: Request,
    @Body() createSubscriptionDto: CreateSubscriptionDto,
  ) {
    const customerId: string = req['customerId'];
    console.log(customerId);
    const createSubscriptionBody = {
      customerId: customerId,
      planId: createSubscriptionDto.planId,
    };
    return this.subscriptionService.create(createSubscriptionBody);
  }

  @Get('all')
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get()
  findOne(@Req() req: Request) {
    const customerId: string = req['customerId'];
    return this.subscriptionService.findOne(customerId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
    @Req() req: Request,
  ) {
    const customerId: string = req['customerId'];
    console.log(customerId);
    const updateSubscriptionBody = {
      customerId: customerId,
      planId: updateSubscriptionDto.planId,
    };
    return this.subscriptionService.update(id, updateSubscriptionBody);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.subscriptionService.remove(id);
  }
}
