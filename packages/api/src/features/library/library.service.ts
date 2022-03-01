import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BehaviorSubject } from 'rxjs';
import { Repository } from 'typeorm';
import { Folder } from '../folder/folder.entity';
import { Library } from './library.entity';
import { LibraryProcessor } from './library.processor';

@Injectable()
export class LibraryService {
  constructor(
    @InjectRepository(Folder)
    private folderRepository: Repository<Folder>,
    private readonly libraryProcessor: LibraryProcessor,
  ) {}

  public async findAll(): Promise<Library[]> {
    return await this.folderRepository.find();
  }

  public async createAJob(libraryId: string): Promise<any> {
    this.libraryProcessor.add({ libraryId });
  }

  public listAllJobs() {
    return this.libraryProcessor.getJobs();
  }
}
