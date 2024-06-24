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
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: 'Cadastra um Produto.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Busca todos os Produtos.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @ApiOperation({ summary: 'Busca todos os Produtos (customer).' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/customer')
  async findAllOrSearch(@Query('search') search: string) {
    if (search) {
      return this.productService.search(search);
    } else {
      return this.productService.findAll();
    }
  }

  @ApiOperation({ summary: 'Busca um Produto pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Busca um Produto pelo ID (customer).' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/customer/:id')
  async findOneForCustomer(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualiza um Produto pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Remove um Produto pelo ID.' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @ApiOperation({ summary: 'Cadastra as imagens de um Produto.' })
  @ApiBearerAuth('Autenticação JWT')
  @Post('images/:productId')
  @UseInterceptors(FilesInterceptor('images'))
  uploadFile(
    @UploadedFiles() images: Express.Multer.File[],
    @Param('productId') productId: string,
  ) {
    return this.productService.uploadProductImages(images, productId);
  }

  @ApiOperation({ summary: 'Remove uma imagem do Produto.' })
  @ApiBearerAuth('Autenticação JWT')
  @Delete('images/:imageId')
  removeImages(@Param('imageId') imageId: string) {
    return this.productService.removeImageById(imageId);
  }
}
