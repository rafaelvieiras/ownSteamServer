import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { System } from './system.entity';

const DEFAULT_SYSTEMS = [
  {
    name: 'Game Boy',
  },
];

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private systemRepository: Repository<System>,
  ) {}

  public async findAll(): Promise<System[]> {
    const results = await this.systemRepository.find();
    if (results.length === 0) {
      await this.createDefaultSystems();
      return this.systemRepository.find();
    } else {
      return results;
    }
  }

  public findOne(id: string): Promise<System> {
    return this.systemRepository.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    await this.systemRepository.delete(id);
  }

  public async create(name: string, isActive = true): Promise<System> {
    const entity = await this.systemRepository.create({
      name,
      isActive,
    });

    return this.systemRepository.save(entity);
  }

  public async createDefaultSystems(): Promise<System[]> {
    const creations = DEFAULT_SYSTEMS.map(async (system) => {
      return this.create(system.name);
    });

    return Promise.all(creations);
  }
}
