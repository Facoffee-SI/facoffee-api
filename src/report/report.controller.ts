import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';

@Controller('report')
@ApiTags('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({
    summary: 'Busca todas os produtos cadastrados para geração de relatórios.',
  })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/products')
  findAllProducts() {
    return this.reportService.findAllProducts();
  }

  @ApiOperation({
    summary: 'Busca todas as vendas para geração de relatórios.',
  })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/orders')
  findAllOrders() {
    return this.reportService.findAllOrders();
  }

  @ApiOperation({
    summary: 'Busca todos os planos para geração de relatórios.',
  })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/plans')
  findAllSubscriptions() {
    return this.reportService.findAllPlans();
  }
}
