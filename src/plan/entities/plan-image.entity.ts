import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PlanEntity } from './plan.entity';

@Entity({ name: 'plan_images' })
export class PlanImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'longblob', nullable: false })
  image: Buffer;

  @ManyToOne(() => PlanEntity, (plan) => plan.images)
  plan: PlanEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;
}
