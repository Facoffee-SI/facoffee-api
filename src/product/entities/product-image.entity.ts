import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';

@Entity({ name: 'product_images' })
export class ProductImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'longblob', nullable: false })
  image: Buffer;

  @ManyToOne(() => ProductEntity, (product) => product.images)
  product: ProductEntity;
}
