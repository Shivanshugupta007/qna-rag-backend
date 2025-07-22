import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../entities/document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document) private docRepo: Repository<Document>,
  ) {}

  create(title: string, filePath: string) {
    const doc = this.docRepo.create({ title, filePath });
    return this.docRepo.save(doc);
  }

  findAll() {
    return this.docRepo.find();
  }

  updateStatus(id: number, status: Document['status']) {
    return this.docRepo.update(id, { status });
  }

  findOne(id: number) {
    return this.docRepo.findOneBy({ id });
  }

  delete(id: number) {
    return this.docRepo.delete(id);
  }
}
