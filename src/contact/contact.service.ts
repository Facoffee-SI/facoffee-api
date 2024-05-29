import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { ContactEntity } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
  ) {}

  async create(createContactDto: CreateContactDto) {
    return await this.contactRepository.save(
      this.contactRepository.create(createContactDto),
    );
  }

  async find() {
    return await this.contactRepository.find();
  }

  async findOneOrFail(id: string) {
    try {
      return await this.contactRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Contato não encontrado.');
    }
  }

  async update(id: string, updateContactDto: UpdateContactDto) {
    const contact = await this.findOneOrFail(id);

    this.contactRepository.merge(contact, updateContactDto);
    return await this.contactRepository.save(contact);
  }

  async remove(id: string) {
    await this.findOneOrFail(id);
    await this.contactRepository.delete(id);
  }
}
