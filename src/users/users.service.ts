import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.users.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`el Usuario ${id}, no se encontro`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`el Usuario ${id}, no se encontro`);
    }
    return await this.prisma.users.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    const user = await this.prisma.users.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`el Usuario ${id}, no se encontro`);
    }
    return await this.prisma.users.delete({ where: { id } });
  }
}
