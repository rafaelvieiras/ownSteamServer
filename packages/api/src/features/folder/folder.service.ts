import * as fs from 'fs';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';
import { FolderSystem } from './folder.interface';
import { GameService } from '../game/game.service';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,
    private gameService: GameService,
  ) {}

  findAll(): Promise<Folder[]> {
    return this.foldersRepository.find();
  }

  findOne(id: string): Promise<Folder> {
    return this.foldersRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.foldersRepository.delete(id);
  }

  async create(
    name: string,
    path: string,
    system: string,
    isActive = true,
  ): Promise<Folder> {
    const entity = await this.foldersRepository.create({
      name,
      path,
      isActive,
      systemId: system,
    });

    try {
      const result = await this.foldersRepository.save(entity);
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

  async saveGameFilesFromFolder(folder: Folder): Promise<any> {
    fs.readdir(folder.path, (err, files) => {
      if (files.length > 0) {
        files.forEach((file) => {
          this.gameService.create(
            file,
            folder.path + '/' + file,
            folder.id,
            folder.type,
            folder.systemId,
          );
        });
      }
      if (err) {
      }
    });
  }

  async listLocalFoldersFromPath(
    path = '/',
    fileType = 0,
  ): Promise<FolderSystem[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, { withFileTypes: true }, (err, files) => {
        if (err) {
          reject(err);
        } else {
          const results = [];
          files
            .filter((file) => {
              if (fileType === 0) {
                return file.isDirectory();
              } else if (fileType === 1) {
                return file.isFile();
              }
            })
            .forEach((file: any) => {
              const fullPath =
                path[path.length - 1] !== '/'
                  ? path + '/' + file.name
                  : path + file.name;

              const result: FolderSystem = {
                name: file.name,
                parentPath: `${path}`,
                fullPath,
              };

              results.push(result);
            });

          resolve(results);
        }
      });
    });
  }
}
