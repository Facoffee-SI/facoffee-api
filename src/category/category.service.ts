import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(
      this.categoryRepository.create(createCategoryDto),
    );
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find({
      order: { name: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOneOrFail(id: string) {
    try {
      return await this.categoryRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Categoria não encontrada.');
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOneOrFail(id);

    this.categoryRepository.merge(category, updateCategoryDto);
    return await this.categoryRepository.save(category);
  }

  async remove(id: string) {
    await this.findOneOrFail(id);
    await this.categoryRepository.softDelete(id);
  }
}
