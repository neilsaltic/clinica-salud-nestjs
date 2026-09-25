import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import bcrypt from 'bcryptjs';
import { Role } from '../generated/prisma/enums.js';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.users.create({
      data: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: hashedPassword,
        role: createUserDto.role ?? Role.RECEPCIONISTA,
        speciality: createUserDto.speciality,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        speciality: true,
      },
    });
  }

  async findAll() {
    return await this.prisma.users.findMany({
      orderBy: { id: 'asc' },
      omit: { password: true },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        creadoEn: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`usuario de ID: ${id} no encontrado`);
    }
    return user;
  }
  async findDoctor(id: number) {
    const doctor = await this.prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        speciality: true,
      },
    });

    if (!doctor) {
      throw new NotFoundException(`El médico con ID ${id} no existe`);
    }

    if (doctor.role !== Role.MEDICO) {
      throw new NotFoundException(
        `El usuario con ID ${id} no está registrado como Médico`,
      );
    }

    return doctor;
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
  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        role: true,
      },
    });
  }
}
