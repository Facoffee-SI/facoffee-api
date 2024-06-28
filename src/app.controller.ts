import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('health-check')
export class AppController {
  @ApiOperation({ summary: 'Verifica se o servidor está online.' })
  @Get()
  getHealthCheck() {
    return JSON.stringify({ status: 'up' });
  }
}
