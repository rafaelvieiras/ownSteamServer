import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { System } from '../system/system.entity';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  path: string;

  @Column({ default: 'file' })
  type: 'folder' | 'file';

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false, nullable: false })
  systemId: string;

  @ManyToOne(() => System, (system) => system.folders)
  @JoinColumn({ name: 'systemId' })
  system: System;
}
