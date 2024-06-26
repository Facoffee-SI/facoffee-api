import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity } from './entities/order.entity';
import { Repository } from 'typeorm';
import { CustomerService } from 'src/customer/customer.service';

interface OrderBody {
  customerId: string;
  total: number;
  situation: string;
}

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly customerService: CustomerService,
  ) {}

  async create(createOrderDto: OrderBody) {
    const customer = await this.customerService.findOneOrFail(
      createOrderDto.customerId,
    );
    const order = this.orderRepository.create({
      ...createOrderDto,
      customer: customer,
    });
    await this.orderRepository.save(order);
  }

  async findAll(customerId: string) {
    const customer = await this.customerService.findOneOrFail(customerId);
    return await this.orderRepository.find({
      relations: ['customer'],
      where: { customer: { id: customer.id } },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number, customerId: string) {
    const customer = await this.customerService.findOneOrFail(customerId);
    const order = await this.orderRepository.findOne({
      where: { id, customer: { id: customer.id } },
      relations: ['customer'],
    });
    if (!order) {
      throw new NotFoundException('Pedido não encontrado com o ID informado');
    }
    return order;
  }

  async update(id: number, updateOrderDto: OrderBody) {
    const order = await this.findOne(id, updateOrderDto.customerId);
    this.orderRepository.merge(order, updateOrderDto);
    return await this.orderRepository.save(order);
  }

  async remove(id: number, customerId: string) {
    await this.findOne(id, customerId);
    await this.orderRepository.delete(id);
  }
}
