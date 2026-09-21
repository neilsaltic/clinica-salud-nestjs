import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { AppointmentController } from './appointment.controller.js';
import { PatientsModule } from '../patients/patients.module.js';

@Module({
  imports: [PatientsModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
