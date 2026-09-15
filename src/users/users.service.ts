import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      return await this.prisma.users.create({
        data: createUserDto,
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.users.findMany({ orderBy: { id: 'asc' } });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`el Usuario ${id}, no se encontro`);
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`el Usuario ${id}, no se encontro`);
      }
      return await this.prisma.users.update({
        where: { id },
        data: updateUserDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id } });
      if (!user) {
        throw new NotFoundException(`el Usuario ${id}, no se encontro`);
      }
      return await this.prisma.users.delete({ where: { id } });
    } catch (error) {
      return error;
    }
  }
}
