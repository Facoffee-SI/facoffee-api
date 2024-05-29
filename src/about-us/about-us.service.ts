import { Injectable } from '@nestjs/common';
import { CreateAboutUsDto } from './dto/create-about-us.dto';
import { UpdateAboutUsDto } from './dto/update-about-us.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutUsEntity } from './entities/about-us.entity';

@Injectable()
export class AboutUsService {
  constructor(
    @InjectRepository(AboutUsEntity)
    private aboutUsRepository: Repository<AboutUsEntity>,
  ) {}

  async create(createAboutUsDto: CreateAboutUsDto) {
    const existingRecords = await this.aboutUsRepository.find();

    if (existingRecords.length > 0) {
      await this.aboutUsRepository.delete({});
    }

    const newAboutUs = this.aboutUsRepository.create(createAboutUsDto);
    return await this.aboutUsRepository.save(newAboutUs);
  }

  findAll() {
    return this.aboutUsRepository.find();
  }

  findOne(id: string) {
    return this.aboutUsRepository.findOneBy({ id });
  }

  async update(id: string, updateAboutUsDto: UpdateAboutUsDto) {
    await this.aboutUsRepository.update(id, updateAboutUsDto);
    return this.aboutUsRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.aboutUsRepository.delete(id);
  }
}
