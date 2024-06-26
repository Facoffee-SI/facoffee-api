import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { UserRoleService } from 'src/user-role/user-role.service';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userRoleService: UserRoleService,
    private readonly s3Service: S3Service,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException('Email já cadastrado.');
    }

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    await this.userRoleService.verifyRoles(createUserDto.roleIds);
    const userCreated = await this.userRepository.save(
      this.userRepository.create(createUserDto),
    );
    await this.userRoleService.create(userCreated.id, createUserDto.roleIds);

    return { id: userCreated.id };
  }

  async findAll() {
    const users = await this.userRepository.find();

    const usersWithRoles = await Promise.all(
      users.map(async (user) => {
        const userRoles = await this.userRoleService.rolesByUser(user.id);
        delete user.password;

        return {
          user,
          userRoles,
        };
      }),
    );

    return usersWithRoles;
  }

  async findOneOrFail(id: string) {
    try {
      return await this.userRepository.findOneOrFail({ where: { id } });
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  }

  async userAndRoles(id: string) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });
      const userRoles = await this.userRoleService.rolesByUser(id);
      delete user.password;

      return {
        user,
        userRoles,
      };
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado.');
    }
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneOrFail(id);
    const userByEmail = await this.findByEmail(updateUserDto.email);
    if (userByEmail && user.id !== userByEmail.id) {
      throw new BadRequestException('Email já cadastrado.');
    }

    updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    await this.userRoleService.verifyRoles(updateUserDto.roleIds);
    await this.userRoleService.recreate(user.id, updateUserDto.roleIds);

    this.userRepository.merge(user, updateUserDto);
    await this.userRepository.save(user);
  }

  async makeAdmin(id: string) {
    const user = await this.findOneOrFail(id);
    user.isAdmin = true;
    return await this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOneOrFail(id);
    if (user.profilePicture) {
      await this.s3Service.deleteImage(user.profilePicture);
    }
    await this.userRoleService.removeByUserId(id);
    await this.userRepository.softDelete(id);
  }

  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }

    return user;
  }

  async sendProfilePicture(
    profilePicture: Express.Multer.File,
    userId: string,
  ): Promise<void> {
    const user = await this.findOneOrFail(userId);
    if (user.profilePicture) {
      await this.s3Service.deleteImage(user.profilePicture);
    }
    const imageUrl = await this.s3Service.uploadImage(profilePicture);
    user.profilePicture = imageUrl;

    await this.userRepository.save(user);
  }
}
