import {
  Injectable,
  UnauthorizedException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';
import { UsersService } from '../users/users.service.js';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from './dto/register.dto.js';
@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async register(registerDto: RegisterUserDto) {
    return this.userService.create(registerDto);
  }

  async login(LoginDto: LoginDto) {
    const user = await this.userService.findByEmail(LoginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }
    const isMatch = await bcrypt.compare(LoginDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales Invalidas');
    }
    const secret = this.configService.getOrThrow<string>('JWT_SECRET');
    const expiresIn = this.configService.getOrThrow<string>('JWT_EXPIRES_IN');
    const options: SignOptions = {
      expiresIn: expiresIn as SignOptions['expiresIn'],
    };
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      secret,
      options,
    );
    return { token };
  }
}
