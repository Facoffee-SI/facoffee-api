/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ProductService } from 'src/product/product.service';
import { OrderService } from 'src/order/order.service';
import { PlanService } from 'src/plan/plan.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly productService: ProductService,
    private readonly orderService: OrderService,
    private readonly planService: PlanService,
  ) {}

  async findAllProducts() {
    const products = await this.productService.findAll();
    return products.map((product) => ({
      ...this.omitFields(product),
      category: product.category.name,
    }));
  }

  async findAllOrders() {
    const orders = await this.orderService.findAll();
    return orders.map((order) => ({
      ...this.omitFields(order),
      customer: order.customer.name,
    }));
  }

  async findAllPlans() {
    const plans = await this.planService.findAll();
    return plans.map((plan) => this.omitFields(plan));
  }

  private omitFields(entity: any) {
    const {
      id,
      deletedAt,
      updatedAt,
      createdAt,
      images,
      description,
      products,
      category,
      customer,
      ...rest
    } = entity;
    return rest;
  }
}
