import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { UserRoleEnum } from 'src/users/types/user.types';

export class RegisterDto {
  @ApiProperty({example: 'test@example.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'testPass@123'})
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({example: UserRoleEnum.VIEWER, enum: UserRoleEnum})
  @IsString()
  role: UserRoleEnum;
}

export class LoginDto {
  @ApiProperty({example: 'test@example.com'})
  @IsEmail()
  email: string;

  @ApiProperty({example: 'testPass@123'})
  @IsString()
  password: string;
}
