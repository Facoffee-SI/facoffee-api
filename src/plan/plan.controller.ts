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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('plan')
@ApiTags('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @ApiOperation({ summary: 'Cadastra um Plano.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Body() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @ApiOperation({ summary: 'Busta todos os Planos.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findAll() {
    return this.planService.findAll();
  }

  @ApiOperation({ summary: 'Busca todos os Planos (customer).' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/customer')
  findAllForCustomer() {
    return this.planService.findAll();
  }

  @ApiOperation({ summary: 'Busca um Plano pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @ApiOperation({ summary: 'Busca um Plano pelo ID (customer).' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/customer/:id')
  async findOneForCustomer(@Param('id') id: string) {
    return await this.planService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza um Plano pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(id, updatePlanDto);
  }

  @ApiOperation({ summary: 'Remove um Plano pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(id);
  }

  @ApiOperation({ summary: 'Cadastra as imagens do Plano.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post('images/:planId')
  @UseInterceptors(FilesInterceptor('images'))
  uploadFile(
    @UploadedFiles() images: Express.Multer.File[],
    @Param('planId') planId: string,
  ) {
    return this.planService.uploadPlanImages(images, planId);
  }

  @ApiOperation({ summary: 'Remove uma imagem de um PLano' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete('images/:imageId')
  removeImages(@Param('imageId') imageId: string) {
    return this.planService.removeImageById(imageId);
  }
}
