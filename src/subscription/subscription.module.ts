import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { CustomerModule } from 'src/customer/customer.module';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionEntity]),
    CustomerModule,
    PlanModule,
  ],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
