import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { SystemModule } from './features/system/system.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FolderModule } from './features/folder/folder.module';
import { LibraryModule } from './features/library/library.module';
import { GameModule } from './features/game/game.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './main.db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    SystemModule,
    FolderModule,
    LibraryModule,
    GameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
