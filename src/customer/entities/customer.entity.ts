import { OrderEntity } from 'src/order/entities/order.entity';
import { SubscriptionEntity } from 'src/subscription/entities/subscription.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'customer' })
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  password: string;

  @Column({ name: 'profile_picture_url', type: 'varchar', nullable: true })
  profilePicture: string;

  @OneToMany(() => OrderEntity, (order) => order.customer)
  orders: OrderEntity[];

  @OneToMany(() => SubscriptionEntity, (subscription) => subscription.customer)
  subscriptions: SubscriptionEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
