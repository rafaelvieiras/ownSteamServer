import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('library')
export class Library {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: true })
  isActive: boolean;

  // @OneToMany(() => Folder, (folder) => folder.system)
  // folders: Folder[];
}
