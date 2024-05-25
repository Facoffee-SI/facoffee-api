import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PlanEntity } from './plan.entity';

@Entity({ name: 'plan_images' })
export class PlanImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'longblob', nullable: false })
  image: Buffer;

  @ManyToOne(() => PlanEntity, (plan) => plan.images)
  plan: PlanEntity;
}
