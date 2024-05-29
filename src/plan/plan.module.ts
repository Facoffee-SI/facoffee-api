import { Module, forwardRef } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { PlanImageEntity } from './entities/plan-image.entity';
import { PlanProductModule } from 'src/plan-product/plan-product.module';

@Module({
  imports: [
    forwardRef(() => PlanProductModule),
    TypeOrmModule.forFeature([PlanEntity]),
    TypeOrmModule.forFeature([PlanImageEntity]),
  ],
  controllers: [PlanController],
  providers: [PlanService],
  exports: [PlanService],
})
export class PlanModule {}
