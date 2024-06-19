import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerEntity } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly customerRepository: Repository<CustomerEntity>,
    private readonly s3Service: S3Service,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.findByEmail(createCustomerDto.email);
    if (customer) {
      throw new BadRequestException('Email já cadastrado.');
    }

    createCustomerDto.password = await bcrypt.hash(
      createCustomerDto.password,
      10,
    );

    const customerCreated = await this.customerRepository.save(
      this.customerRepository.create(createCustomerDto),
    );

    return { id: customerCreated.id };
  }

  async findAll() {
    await this.customerRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.customerRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Cliente não encontrado.');
    }
  }

  async findByEmail(email: string): Promise<CustomerEntity | undefined> {
    return this.customerRepository.findOne({ where: { email } });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOneOrFail(id);
    const customerByEmail = await this.findByEmail(updateCustomerDto.email);
    if (customerByEmail && customer.id !== customerByEmail.id) {
      throw new BadRequestException('Email já cadastrado.');
    }

    updateCustomerDto.password = await bcrypt.hash(
      updateCustomerDto.password,
      10,
    );
    this.customerRepository.merge(customer, updateCustomerDto);
    await this.customerRepository.save(customer);
  }

  async remove(id: string) {
    const customer = await this.findOneOrFail(id);
    if (customer.profilePicture) {
      await this.s3Service.deleteImage(customer.profilePicture);
    }
    await this.customerRepository.softDelete(id);
  }

  async validateCustomer(
    email: string,
    password: string,
  ): Promise<CustomerEntity> {
    const customer = await this.findByEmail(email);
    if (!customer) {
      throw new UnauthorizedException('Cliente não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, customer.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return customer;
  }

  async sendProfilePicture(
    profilePicture: Express.Multer.File,
    customerId: string,
  ): Promise<void> {
    const customer = await this.findOneOrFail(customerId);
    if (customer.profilePicture) {
      await this.s3Service.deleteImage(customer.profilePicture);
    }
    const imageUrl = await this.s3Service.uploadImage(profilePicture);
    customer.profilePicture = imageUrl;

    await this.customerRepository.save(customer);
  }
}
