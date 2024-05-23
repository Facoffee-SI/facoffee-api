import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { categoryId } = createProductDto;
    const category = await this.categoryService.findOneOrFail(categoryId);
    const product = this.productRepository.create({
      ...createProductDto,
      category: category,
    });
    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository.find({
      relations: ['category'],
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { categoryId, ...otherUpdates } = updateProductDto;
    const product = await this.productRepository.findOne({ where: { id } });

    if (categoryId) {
      const category = await this.categoryService.findOneOrFail(categoryId);
      this.productRepository.merge(product, { ...otherUpdates, category });
    } else {
      this.productRepository.merge(product, otherUpdates);
    }
    return await this.productRepository.save(product);
  }

  async remove(id: string) {
    return await this.productRepository.delete(id);
  }
}
