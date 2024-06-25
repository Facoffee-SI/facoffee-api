import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SubscriptionEntity } from './entities/subscription.entity';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';
import { PlanService } from 'src/plan/plan.service';
import * as moment from 'moment';

interface SubscriptionBody {
  customerId: string;
  planId: string;
  yearly: boolean;
}

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private readonly subscriptionRepository: Repository<SubscriptionEntity>,
    private readonly customerService: CustomerService,
    private readonly planService: PlanService,
  ) {}

  private calculateExpirationDate(yearly: boolean) {
    let expirationDate: moment.MomentInput;
    if (yearly) {
      expirationDate = moment(expirationDate).add(1, 'year').toDate();
    } else {
      expirationDate = moment(expirationDate).add(1, 'month').toDate();
    }

    return expirationDate;
  }

  async create(createSubscriptionDto: SubscriptionBody) {
    const expirationDate = this.calculateExpirationDate(
      createSubscriptionDto.yearly,
    );

    const customer = await this.customerService.findOneOrFail(
      createSubscriptionDto.customerId,
    );
    const plan = await this.planService.findOne(createSubscriptionDto.planId);

    const subscription = this.subscriptionRepository.create({
      plan: plan,
      customer: customer,
      expirationDate: expirationDate,
    });
    await this.subscriptionRepository.save(subscription);
  }

  async findAll() {
    return await this.subscriptionRepository.find({
      relations: ['customer', 'plan'],
      order: { id: 'ASC' },
    });
  }

  async findOne(customerId: string) {
    const customer = await this.customerService.findOneOrFail(customerId);
    const subscription = await this.subscriptionRepository.findOne({
      where: { customer: { id: customer.id } },
      relations: ['customer', 'plan'],
    });
    if (!subscription) {
      throw new NotFoundException('Assinatura não encontrada');
    }
    return subscription;
  }

  async update(id: string, updateSubscriptionDto: SubscriptionBody) {
    const expirationDate = this.calculateExpirationDate(
      updateSubscriptionDto.yearly,
    );

    const subscription = await this.findOne(id);
    const customer = await this.customerService.findOneOrFail(
      updateSubscriptionDto.customerId,
    );
    const plan = await this.planService.findOne(updateSubscriptionDto.planId);
    this.subscriptionRepository.merge(subscription, {
      customer,
      plan,
      expirationDate,
    });
    return await this.subscriptionRepository.save(subscription);
  }

  async remove(customerId: string) {
    const subscription = await this.findOne(customerId);
    await this.subscriptionRepository.softDelete(subscription.id);
  }

  async checkSubscriptionExpiration() {
    try {
      const subscriptions = await this.findAll();

      for (const subscription of subscriptions) {
        if (this.hasSubscriptionExpired(subscription)) {
          await this.remove(subscription.id);
        }
      }
    } catch (error) {
      console.error(
        'Erro ao verificar expiração de assinaturas:',
        error.message,
      );
    }
  }

  hasSubscriptionExpired(subscription: SubscriptionEntity): boolean {
    const expirationDate = new Date(subscription.expirationDate);
    const currentDate = new Date();

    expirationDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    return currentDate > expirationDate;
  }
}
