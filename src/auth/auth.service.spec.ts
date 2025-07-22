import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './service/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRoleEnum } from '../users/types/user.types';

describe('AuthService', () => {
  let service: AuthService;
  let usersRepo: any;

  beforeEach(async () => {
    usersRepo = {
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getRepositoryToken(User),
          useValue: usersRepo,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    usersRepo.findOneBy.mockResolvedValue(null);
    usersRepo.create.mockReturnValue({ id: 1 });
    usersRepo.save.mockResolvedValue({ id: 1 });

    const dto = { email: 'test@test.com', password: 'pass123', role: UserRoleEnum.VIEWER };
    const result = await service.register(dto);

    expect(result).toEqual({ message: 'User registered successfully' });
  });

  it('should throw if user already exists', async () => {
    usersRepo.findOneBy.mockResolvedValue({ id: 1 });

    await expect(
      service.register({ email: 'test@test.com', password: 'pass123', role: UserRoleEnum.VIEWER }),
    ).rejects.toThrow('User with this email already exists');
  });
});
