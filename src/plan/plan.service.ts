import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanEntity } from './entities/plan.entity';
import { PlanImageEntity } from './entities/plan-image.entity';
import { PlanProductService } from 'src/plan-product/plan-product.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
    @InjectRepository(PlanImageEntity)
    private readonly planImageRepository: Repository<PlanImageEntity>,
    @Inject(forwardRef(() => PlanProductService))
    private readonly planProductService: PlanProductService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    const plan = this.planRepository.create(createPlanDto);
    const planCreated = await this.planRepository.save(plan);
    await this.planProductService.updatePlanProducts(
      planCreated.id,
      createPlanDto.productIds,
    );

    return planCreated;
  }

  async findAll() {
    return await this.planRepository.find({
      order: { name: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const plan = await this.planRepository.findOne({
      where: { id },
      relations: ['images', 'products'],
    });

    if (!plan) {
      throw new NotFoundException(`Plano com ID ${id} não encontrado`);
    }
    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    await this.planProductService.updatePlanProducts(
      id,
      updatePlanDto.productIds,
    );
    const plan = await this.findOne(id);
    this.planRepository.merge(plan, updatePlanDto);
    return await this.planRepository.save(plan);
  }

  async uploadPlanImages(
    images: Express.Multer.File[],
    planId: string,
  ): Promise<void> {
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    if (!plan) {
      throw new NotFoundException('Plano não encontrado com o ID informado');
    }

    await this.planImageRepository.delete({ plan });
    const imageEntities = await Promise.all(
      images.map(async (image) => {
        const imageUrl = await this.s3Service.uploadImage(image);
        const imageEntity = this.planImageRepository.create({
          imageUrl: imageUrl,
          plan: plan,
        });
        return imageEntity;
      }),
    );

    await this.planImageRepository.save(imageEntities);
  }

  async removeImages(planId: string) {
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    const imageEntities = await this.planImageRepository.findBy({ plan });
    await Promise.all(
      imageEntities.map((image) => this.s3Service.deleteImage(image.imageUrl)),
    );
    await this.planImageRepository.delete({ plan });
  }

  async remove(id: string) {
    const imageEntities = await this.planImageRepository.findBy({
      plan: { id: id },
    });

    await Promise.all(
      imageEntities.map((image) => this.s3Service.deleteImage(image.imageUrl)),
    );

    await this.planImageRepository.delete({ plan: { id } });
    return await this.planRepository.delete(id);
  }
}
