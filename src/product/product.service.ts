import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { ProductImageEntity } from './entities/product-image.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
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
      order: { name: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'images'],
    });
    return product;
  }

  async findByIds(productIds: string[]) {
    return await this.productRepository.findBy({
      id: In(productIds),
    });
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

  async sendProductImage(
    image: Express.Multer.File,
    productId: string,
  ): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const images = await this.productImageRepository.find({
      where: { product: product },
    });

    if (images) {
      await this.productImageRepository.delete({ product });
    }

    const imageProduct = this.productImageRepository.create({
      image: image.buffer,
      product: product,
    });

    await this.productImageRepository.save(imageProduct);
  }

  async remove(id: string) {
    await this.productImageRepository.delete({ product: { id } });
    return await this.productRepository.delete(id);
  }
}
