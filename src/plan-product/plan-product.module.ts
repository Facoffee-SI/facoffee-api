import { Module, forwardRef } from '@nestjs/common';
import { PlanProductService } from './plan-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanModule } from 'src/plan/plan.module';
import { PlanProductEntity } from './entities/plan-product.entity';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    ProductModule,
    forwardRef(() => PlanModule),
    TypeOrmModule.forFeature([PlanProductEntity]),
  ],
  controllers: [],
  providers: [PlanProductService],
  exports: [PlanProductService],
})
export class PlanProductModule {}
