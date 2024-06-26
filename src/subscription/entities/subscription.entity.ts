import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerEntity } from 'src/customer/entities/customer.entity';
import { PlanEntity } from 'src/plan/entities/plan.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'expiration_date', type: 'timestamp' })
  expirationDate: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.subscriptions)
  @JoinColumn({ name: 'customer_id' })
  customer: CustomerEntity;

  @ManyToOne(() => PlanEntity, (plan) => plan.subscriptions)
  @JoinColumn({ name: 'plan_id' })
  plan: PlanEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
