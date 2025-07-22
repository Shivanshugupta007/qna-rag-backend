import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LoginDto, RegisterDto } from '../dto/index';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiBody({type: RegisterDto})
  @ApiOperation({summary: 'Register a new user'})
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiBody({type: LoginDto})
  @ApiOperation({summary: 'User login'})
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'User logout'})
  @Post('logout')
  logout(@Request() req) {
    return this.authService.logout(req.user);
  }
}
