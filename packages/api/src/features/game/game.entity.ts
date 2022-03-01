import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Folder } from '../folder/folder.entity';
import { System } from '../system/system.entity';

@Entity('games')
export class Game {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  path: string;

  @Column({ default: 'file' })
  type: 'folder' | 'file';

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: false })
  systemId: string;

  @ManyToOne(() => System, (system) => system.folders)
  @JoinColumn({ name: 'systemId' })
  system: System;

  @Column({ nullable: false })
  folderId: string;

  @ManyToOne(() => Folder, (folder) => folder.games)
  @JoinColumn({ name: 'folderId' })
  folder: System;
}
