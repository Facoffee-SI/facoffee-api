import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanImageEntity } from './plan-image.entity';
import { PlanProductEntity } from 'src/plan-product/entities/plan-product.entity';

@Entity({ name: 'plan' })
export class PlanEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceMonth: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  priceYear: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @OneToMany(() => PlanImageEntity, (image) => image.plan, {
    cascade: true,
  })
  @JoinTable({ name: 'plan_images' })
  images: PlanImageEntity[];

  @OneToMany(() => PlanProductEntity, (planProduct) => planProduct.plan, {
    cascade: true,
    eager: true,
  })
  products: PlanProductEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
