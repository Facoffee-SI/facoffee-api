import { Module, forwardRef } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanEntity } from './entities/plan.entity';
import { PlanImageEntity } from './entities/plan-image.entity';
import { PlanProductModule } from 'src/plan-product/plan-product.module';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [
    forwardRef(() => PlanProductModule),
    TypeOrmModule.forFeature([PlanEntity]),
    TypeOrmModule.forFeature([PlanImageEntity]),
  ],
  controllers: [PlanController],
  providers: [PlanService, S3Service],
  exports: [PlanService],
})
export class PlanModule {}
