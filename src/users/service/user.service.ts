import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserRoleEnum } from '../types/user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  findById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async updateRole(id: number, role: UserRoleEnum) {
    await this.userRepo.update(id, { role });
    return this.userRepo.findOneBy({ id });
  }

  async delete(id: number) {
    await this.userRepo.delete(id);
    return { message: 'Deleted' };
  }
}
