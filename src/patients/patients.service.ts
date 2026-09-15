import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { UpdatePatientDto } from './dto/update-patient.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { Prisma } from '../generated/prisma/client.js';

@Injectable()
export class PatientsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createPatientDto: CreatePatientDto) {
    try {
      return await this.prisma.patients.create({
        data: {
          ...createPatientDto,
          dateOfBirth: new Date(createPatientDto.dateOfBirth),
        },
      });
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      return await this.prisma.patients.findMany({
        orderBy: { id: 'asc' },
      });
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.prisma.patients.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`Paciente ${id}, no encontrado`);
      }
      return user;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    try {
      const user = await this.prisma.patients.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`Paciente ${id}, no encontrado`);
      }
      return await this.prisma.patients.update({
        where: { id },
        data: updatePatientDto,
      });
    } catch (error) {
      return error;
    }
  }

  async remove(id: number) {
    try {
      const user = await this.prisma.patients.findUnique({
        where: { id },
      });
      if (!user) {
        throw new NotFoundException(`Paciente ${id}, no encontrado`);
      }
      return await this.prisma.patients.delete({ where: { id } });
    } catch (error) {}
  }
}
