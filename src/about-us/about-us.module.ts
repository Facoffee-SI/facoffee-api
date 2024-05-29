import { Module } from '@nestjs/common';
import { AboutUsService } from './about-us.service';
import { AboutUsController } from './about-us.controller';
import { AboutUsEntity } from './entities/about-us.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AboutUsEntity])],
  controllers: [AboutUsController],
  providers: [AboutUsService],
})
export class AboutUsModule {}
