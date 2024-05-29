import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanEntity } from 'src/plan/entities/plan.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Entity({ name: 'plan_product' })
export class PlanProductEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => PlanEntity, (plan) => plan.products)
  @JoinColumn({ name: 'plan_id' })
  plan: PlanEntity;

  @ManyToOne(() => ProductEntity, (product) => product.plans)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
