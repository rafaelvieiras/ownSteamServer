import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { System } from './system.entity';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Get()
  async findAll(): Promise<System[]> {
    return this.systemService.findAll();
  }

  @Post()
  async create(@Body('name') name: string): Promise<System> {
    return this.systemService.create(name);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.systemService.remove(id);
  }
}
