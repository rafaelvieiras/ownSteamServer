// import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private gameRepository: Repository<Game>,
  ) {}

  findAll(): Promise<Game[]> {
    return this.gameRepository.find();
  }

  findOne(id: string): Promise<Game> {
    return this.gameRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.gameRepository.delete(id);
  }

  async create(
    name: string,
    path: string,
    folder: string,
    folderType: 'file' | 'folder',
    system: string,
    isActive = true,
  ): Promise<Game> {
    const entity = await this.gameRepository.create({
      name,
      path,
      isActive,
      type: folderType,
      folderId: folder,
      systemId: system,
    });

    try {
      const result = await this.gameRepository.save(entity);
      return result;
    } catch (error) {
      const errorData = {
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      };
      // let message = 'Folder already exists';
      if (error.code === 'SQLITE_CONSTRAINT') {
        errorData.message = 'Information missing';
      }
      throw new HttpException(errorData.message, errorData.status);
    }
  }
}
