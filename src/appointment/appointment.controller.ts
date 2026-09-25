import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service.js';
import { CreateAppointmentDto } from './dto/create-appointment.dto.js';
import { UpdateAppointmentDto } from './dto/update-appointment.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorators.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('appointment')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiResponse({
  status: 401,
  description: 'no tienes permisos para acceder a ese recurso',
})
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({
    summary: 'crea una cita nueva, disponible solo para Recepcionista',
  })
  @ApiResponse({
    status: 201,
    description: 'cita creado exitosamente ',
  })
  @ApiResponse({
    status: 400,
    description: 'mal formato en el cuerpo de la solicitud',
  })
  @Roles('RECEPCIONISTA')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'trae a todas las citas, disponible solo para Recepcionista y Medico',
  })
  @ApiResponse({
    status: 200,
    description: 'vista de usuarios exitosa ',
  })
  @Roles('RECEPCIONISTA', 'MEDICO')
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'trae una cita en especifico solo disponible para recepcionista y Medico',
  })
  @ApiResponse({
    status: 200,
    description: 'cita traida exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @Roles('RECEPCIONISTA', 'MEDICO')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'actualiza una citra en especifico solo disponible para recepcionista y Medico',
  })
  @ApiResponse({
    status: 200,
    description: 'cita actualizada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @Roles('RECEPCIONISTA', 'MEDICO')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'elimina a una cita en especifico solo disponible para Gerencia',
  })
  @ApiResponse({
    status: 200,
    description: 'cita eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @Roles('GERENCIA')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(+id);
  }
}
