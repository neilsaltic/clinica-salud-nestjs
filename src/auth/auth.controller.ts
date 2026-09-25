import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { RolesGuard } from './guards/roles.guard.js';
import { RegisterUserDto } from './dto/register.dto.js';
CreateUserDto;
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'registra un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'usuario creado exitosamente ',
  })
  @ApiResponse({
    status: 400,
    description: 'mal formato del cuerpo de la solicitud',
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
  @Post('login')
  @ApiOperation({ summary: 'logea a un usuario existente' })
  async login(@Body() LoginDto: LoginDto) {
    return this.authService.login(LoginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'retorna informacion del usuario logeado' })
  async profile(@Req() req: Request & { user: unknown }) {
    return req.user;
  }
}
