import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Folder } from '../folder/folder.entity';

@Entity('systems')
export class System {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Folder, (folder) => folder.system)
  folders: Folder[];
}
