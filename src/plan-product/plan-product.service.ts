import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PlanProductEntity } from './entities/plan-product.entity';
import { PlanService } from 'src/plan/plan.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class PlanProductService {
  constructor(
    @Inject(forwardRef(() => PlanService))
    private readonly planService: PlanService,
    private readonly productService: ProductService,
    @InjectRepository(PlanProductEntity)
    private readonly planProductRepository: Repository<PlanProductEntity>,
  ) {}

  async remove(planId: string) {
    await this.planProductRepository.delete({ plan: { id: planId } });
  }

  async updatePlanProducts(planId: string, productIds: string[]) {
    // 1. Remove as associações existentes entre o plano e os produtos antigos
    await this.planProductRepository.delete({ plan: { id: planId } });

    // 2. Busca o plano a ser atualizado
    const plan = await this.planService.findOne(planId);

    // 3. Busca os novos produtos e cria novas associações
    const products = await this.productService.findByIds(productIds);
    const newPlanProducts = products.map((product) => {
      const planProduct = new PlanProductEntity();
      planProduct.plan = plan;
      planProduct.product = product;
      return planProduct;
    });

    // Salva as novas associações
    return await this.planProductRepository.save(newPlanProducts);
  }
}
