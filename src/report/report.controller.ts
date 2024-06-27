import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ReportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @ApiOperation({ summary: 'Busca todas os produtos cadastrados.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/products')
  findAllProducts() {
    return this.reportService.findAllProducts();
  }

  @ApiOperation({ summary: 'Busca todas as vendas.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/orders')
  findAllOrders() {
    return this.reportService.findAllOrders();
  }

  @ApiOperation({ summary: 'Busca todos os planos.' })
  @ApiBearerAuth('Autenticação JWT')
  @Get('/plans')
  findAllSubscriptions() {
    return this.reportService.findAllPlans();
  }
}
