import { Injectable } from '@nestjs/common';
import { CreateAboutDto } from './dto/create-about.dto';
import { UpdateAboutDto } from './dto/update-about.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutEntity } from './entities/about.entity';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(AboutEntity)
    private aboutRepository: Repository<AboutEntity>,
  ) {}

  async create(createAboutDto: CreateAboutDto) {
    const existingRecords = await this.aboutRepository.find();

    if (existingRecords.length > 0) {
      await this.aboutRepository.delete({});
    }

    const newAbout = this.aboutRepository.create(createAboutDto);
    return await this.aboutRepository.save(newAbout);
  }

  findAll() {
    return this.aboutRepository.find();
  }

  findOne(id: string) {
    return this.aboutRepository.findOneBy({ id });
  }

  async update(id: string, updateAboutDto: UpdateAboutDto) {
    await this.aboutRepository.update(id, updateAboutDto);
    return this.aboutRepository.findOneBy({ id });
  }

  remove(id: string) {
    return this.aboutRepository.delete(id);
  }
}
