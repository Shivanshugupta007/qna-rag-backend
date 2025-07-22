import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { DocumentStatus } from '../types/document.types';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  filePath: string;

  @Column({ default: 'pending' })
  status: DocumentStatus;
}
