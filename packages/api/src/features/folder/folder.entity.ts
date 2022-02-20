import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('folders')
export class Folder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  path: string;

  @Column({ default: true })
  isActive: boolean;
}
