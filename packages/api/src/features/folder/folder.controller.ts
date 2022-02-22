import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { Folder } from './folder.entity';
import { FolderSystem } from './folder.interface';
import { FolderService } from './folder.service';

@Controller('folder')
export class FolderController {
  constructor(private readonly folderService: FolderService) {}

  @Get()
  async findAll(): Promise<Folder[]> {
    return this.folderService.findAll();
  }

  @Get('/local')
  async listLocalFoldersFromPath(
    @Query('path') path?: string,
  ): Promise<FolderSystem[]> {
    return this.folderService.listLocalFoldersFromPath(path);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Folder> {
    return this.folderService.findOne(id);
  }

  @Post()
  async create(
    @Body('name') name: string,
    @Body('path') path: string,
    @Body('system') system: string,
  ): Promise<Folder> {
    return this.folderService.create(name, path, system);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.folderService.remove(id);
  }
}
