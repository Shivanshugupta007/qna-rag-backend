import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { RegisterDto, LoginDto } from '../dto/index';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {

    const userDetail = await this.usersRepo.findOneBy({email: dto.email})

    if(userDetail){
      throw new ConflictException('User with this email already exists')
    }

    const password = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({ ...dto, password });
    await this.usersRepo.save(user);
    return { message: 'User registered successfully' };
  }

  async login(dto: LoginDto) {
    const user = await this.usersRepo.findOneBy({ email: dto.email });
    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException();
    }
    console.log("user", user);
    const token = this.jwtService.sign({ sub: user.id, role: user.role });
    return { token };
  }

  async logout(user: any) {
    return { message: 'Logged out' };
  }
}
