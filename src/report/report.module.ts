import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { OrderModule } from 'src/order/order.module';
import { ProductModule } from 'src/product/product.module';
import { PlanModule } from 'src/plan/plan.module';

@Module({
  imports: [ProductModule, OrderModule, PlanModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
