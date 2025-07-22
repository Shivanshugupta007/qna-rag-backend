import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './controller/user.controller';
import { UsersService } from './service/user.service';
import { UserRoleEnum } from './types/user.types';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    findAll: jest.fn().mockResolvedValue([{ id: 1, email: 'admin@test.com' }]),
    updateRole: jest.fn().mockResolvedValue({ id: 1, role: 'editor' }),
    delete: jest.fn().mockResolvedValue({ message: 'Deleted' }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should return all users', async () => {
    const result = await controller.findAll();
    expect(result).toEqual([{ id: 1, email: 'admin@test.com' }]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should update user role', async () => {
    const result = await controller.updateRole('1', UserRoleEnum.EDITOR);
    expect(result).toEqual({ id: 1, role: 'editor' });
    expect(service.updateRole).toHaveBeenCalledWith(1, 'editor');
  });

  it('should delete user by id', async () => {
    const result = await controller.delete('1');
    expect(result).toEqual({ message: 'Deleted' });
    expect(service.delete).toHaveBeenCalledWith(1);
  });
});
