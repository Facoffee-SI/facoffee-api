import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { ProductImageEntity } from './entities/product-image.entity';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity]),
    TypeOrmModule.forFeature([ProductImageEntity]),
    CategoryModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, S3Service],
  exports: [ProductService],
})
export class ProductModule {}
