import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { PlanImageEntity } from './entities/plan-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PlanEntity]),
    TypeOrmModule.forFeature([PlanImageEntity]),
  ],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
