import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { FilesInterceptor } from '@nestjs/platform-express';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }

  @Post('images/:planId')
  @UseInterceptors(FilesInterceptor('images'))
  uploadFile(
    @UploadedFiles() images: Express.Multer.File[],
    @Param('planId') planId: string,
  ) {
    return this.planService.uploadPlanImages(images, planId);
  }

  @Delete('images/:planId')
  removeImages(@Param('planId') planId: string) {
    return this.planService.removeImages(planId);
  }
}
