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

  @OneToMany(() => PlanImageEntity, (image) => image.plan, {
    cascade: true,
  })
  @JoinTable({ name: 'plan_images' })
  images: PlanImageEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
