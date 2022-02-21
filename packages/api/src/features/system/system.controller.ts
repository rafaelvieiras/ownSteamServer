import { Controller, Get } from '@nestjs/common';
import { System } from './system.entity';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  async findAll(): Promise<System[]> {
    return this.systemService.findAll();
  }
}
