import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Folder } from './folder.entity';
import { FolderSystem } from './folder.interface';

@Injectable()
export class FolderService {
  constructor(
    @InjectRepository(Folder)
    private foldersRepository: Repository<Folder>,
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

  async create(name: string, path: string, isActive = true): Promise<Folder> {
    return this.foldersRepository.create({
      name,
      path,
      isActive,
    });
  }

  async listLocalFoldersFromPath(path = '/'): Promise<FolderSystem[]> {
    return new Promise((resolve, reject) => {
      fs.readdir(path, { withFileTypes: true }, (err, files) => {
        if (err) {
          reject(err);
        } else {
          const results = [];
          files
            .filter((file) => file.isDirectory())
            .forEach((file: any) => {
              const fullPath =
                path[path.length - 1] !== '/'
                  ? path + '/' + file.name
                  : path + file.name;

              const folder: FolderSystem = {
                name: file.name,
                parentPath: `${path}`,
                fullPath,
              };

              results.push(folder);
            });

          resolve(results);
        }
      });
    });
  }
}
