import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { CategoryService } from 'src/category/category.service';
import { ProductImageEntity } from './entities/product-image.entity';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    @InjectRepository(ProductImageEntity)
    private readonly productImageRepository: Repository<ProductImageEntity>,
    private readonly categoryService: CategoryService,
    private readonly s3Service: S3Service,
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
      relations: ['category', 'images'],
      order: { name: 'ASC', createdAt: 'DESC' },
    });
  }

  async findAllForCustomer() {
    const products = await this.productRepository.find({
      relations: ['category', 'images'],
      order: { name: 'ASC', createdAt: 'DESC' },
    });

    return products.map((product) => ({
      ...product,
      image: product.images[0] ? product.images[0] : null,
    }));
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

  async uploadProductImages(
    images: Express.Multer.File[],
    productId: string,
  ): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado com o ID informado');
    }

    await this.productImageRepository.delete({ product });
    const imageEntities = await Promise.all(
      images.map(async (image) => {
        const imageUrl = await this.s3Service.uploadImage(image);
        const imageEntity = this.productImageRepository.create({
          imageUrl: imageUrl,
          product: product,
        });
        return imageEntity;
      }),
    );

    await this.productImageRepository.save(imageEntities);
  }

  async removeImages(productId: string) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const imageEntities = await this.productImageRepository.findBy({ product });
    await Promise.all(
      imageEntities.map((image) => this.s3Service.deleteImage(image.imageUrl)),
    );
    await this.productImageRepository.delete({ product });
  }

  async remove(id: string) {
    const imageEntities = await this.productImageRepository.findBy({
      product: { id: id },
    });

    await Promise.all(
      imageEntities.map((image) => this.s3Service.deleteImage(image.imageUrl)),
    );

    await this.productImageRepository.delete({ product: { id } });
    return await this.productRepository.delete(id);
  }
}
