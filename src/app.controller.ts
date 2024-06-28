import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHealthCheck() {
    return JSON.stringify({ status: 'up' });
  }
}
