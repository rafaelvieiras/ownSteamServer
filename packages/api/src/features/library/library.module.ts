import { LibraryController } from './library.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Library } from './library.entity';
import { LibraryService } from './library.service';
import { FolderService } from '../folder/folder.service';
import { Folder } from '../folder/folder.entity';
import { BullModule } from '@nestjs/bull';
import { LibraryProcessor } from './library.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([Folder]), 
    BullModule.registerQueue({
      name: 'library',
    })
  ],
  controllers: [LibraryController],
  providers: [LibraryService, FolderService, LibraryProcessor],
  exports: [TypeOrmModule],
})
export class LibraryModule {}
