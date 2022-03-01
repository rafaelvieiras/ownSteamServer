import { Body, Controller, Get, Post } from '@nestjs/common';
import { FolderService } from '../folder/folder.service';
import { Library } from './library.entity';
import { LibraryService } from './library.service';

@Controller('library')
export class LibraryController {
  constructor(
    private readonly libraryService: LibraryService,
    private readonly folderService: FolderService,
  ) {}

  @Get()
  async findAll(): Promise<Library[]> {
    return this.folderService.findAll();
  }

  @Get('/sync')
  async listSyncJobs(): Promise<any> {
    return this.libraryService.listAllJobs();
  }

  @Post('/sync')
  async createSyncJob(@Body('libraryId') libraryId: string): Promise<any> {
    this.libraryService.createAJob(libraryId);
  }
}
