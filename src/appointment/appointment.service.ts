import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class AppointmentService {
  constructor(private prisma: PrismaService) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { datetime, reason, patientId, doctorId } = createAppointmentDto;

    return this.prisma.appointments.create({
      data: {
        dateTime: new Date(datetime),
        reason,
        patientId,
        doctorId,
      },
      include: {
        patient: { select: { id: true, name: true, lastname: true } },
        doctor: { select: { id: true, name: true } },
      },
    });
  }

  async findAll() {
    return this.prisma.appointments.findMany({
      orderBy: { dateTime: 'desc' },
      include: {
        patient: { select: { id: true, name: true, lastname: true } },
        doctor: { select: { id: true, name: true } },
      },
    });
  }

  async findOne(id: number) {
    const cita = await this.prisma.appointments.findUnique({
      where: { id },
      include: {
        patient: { select: { id: true, name: true, lastname: true } },
        doctor: { select: { id: true, name: true } },
      },
    });

    if (!cita) {
      throw new NotFoundException(`La cita con ID ${id} no existe`);
    }
    return cita;
  }

  async update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    await this.findOne(id);

    const datos = { ...updateAppointmentDto };
    if (datos.datetime) {
      datos.datetime = new Date(datos.datetime) as any;
    }

    return this.prisma.appointments.update({
      where: { id },
      data: datos,
      include: {
        patient: { select: { id: true, name: true, lastname: true } },
        doctor: { select: { id: true, name: true } },
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.appointments.delete({
      where: { id },
    });
  }
}
