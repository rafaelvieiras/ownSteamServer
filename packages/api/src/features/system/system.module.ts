import { SystemController } from './system.controller';
import { SystemService } from './system.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { System } from './system.entity';

@Module({
  imports: [TypeOrmModule.forFeature([System])],
  controllers: [SystemController],
  providers: [SystemService],
  exports: [TypeOrmModule],
})
export class SystemModule {}
