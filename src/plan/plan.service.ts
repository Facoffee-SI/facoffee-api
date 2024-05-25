import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanEntity } from './entities/plan.entity';
import { PlanImageEntity } from './entities/plan-image.entity';

@Injectable()
export class PlanService {
  constructor(
    @InjectRepository(PlanEntity)
    private readonly planRepository: Repository<PlanEntity>,
    @InjectRepository(PlanImageEntity)
    private readonly planImageRepository: Repository<PlanImageEntity>,
  ) {}

  async create(createPlanDto: CreatePlanDto) {
    const plan = this.planRepository.create(createPlanDto);
    return await this.planRepository.save(plan);
  }

  async findAll() {
    return await this.planRepository.find();
  }

  async findOne(id: string) {
    const plan = await this.planRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    return plan;
  }

  async update(id: string, updatePlanDto: UpdatePlanDto) {
    const plan = await this.planRepository.findOne({ where: { id } });

    this.planRepository.merge(plan, updatePlanDto);
    return await this.planRepository.save(plan);
  }

  async sendPlanImage(
    image: Express.Multer.File,
    planId: string,
  ): Promise<void> {
    const plan = await this.planRepository.findOne({
      where: { id: planId },
    });

    const images = await this.planImageRepository.find({
      where: { plan: plan },
    });

    if (images) {
      await this.planImageRepository.delete({ plan });
    }

    const imagePlan = this.planImageRepository.create({
      image: image.buffer,
      plan: plan,
    });

    await this.planImageRepository.save(imagePlan);
  }

  async remove(id: string) {
    await this.planImageRepository.delete({ plan: { id } });
    return await this.planRepository.delete(id);
  }
}
