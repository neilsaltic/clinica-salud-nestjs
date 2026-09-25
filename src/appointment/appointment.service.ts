import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { PatientsService } from '../patients/patients.service.js';
import { UsersService } from '../users/users.service.js';

@Injectable()
export class AppointmentService {
  constructor(
    private prisma: PrismaService,
    private readonly patientService: PatientsService,
    private readonly userService: UsersService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto) {
    const { datetime, reason, patientId, doctorId } = createAppointmentDto;
    const patient = await this.patientService.findOne(patientId);
    if (!patient) {
      throw new NotFoundException(
        `El paciente con el id ${patientId} no existe`,
      );
    }
    const doctor = await this.userService.findDoctor(doctorId);
    if (!doctor) {
      throw new NotFoundException(`El doctor con el id ${patientId} no existe`);
    }

    return this.prisma.appointments.create({
      data: {
        dateTime: new Date(datetime),
        reason,
        patientId: patient.id,
        doctorId: doctor.id,
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
