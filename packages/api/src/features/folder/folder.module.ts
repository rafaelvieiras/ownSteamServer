import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameModule } from '../game/game.module';
import { FolderController } from './folder.controller';
import { Folder } from './folder.entity';
import { FolderService } from './folder.service';

@Module({
  imports: [TypeOrmModule.forFeature([Folder]), GameModule],
  controllers: [FolderController],
  providers: [FolderService],
  exports: [TypeOrmModule],
})
export class FolderModule {}
