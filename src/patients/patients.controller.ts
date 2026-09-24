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
import { PatientsService } from './patients.service.js';
import { CreatePatientDto } from './dto/create-patient.dto.js';
import { UpdatePatientDto } from './dto/update-patient.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorators.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('patients')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiResponse({
  status: 401,
  description: 'no tienes permisos para acceder a ese recurso',
})
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  @ApiOperation({
    summary: 'crea un paciente nuevo disponible solo para Recepcionista',
  })
  @ApiResponse({
    status: 201,
    description: 'paciente creado exitosamente ',
  })
  @ApiResponse({
    status: 400,
    description: 'mal formato en el cuerpo de la solicitud',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA')
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'trae a todos los pacientes disponible solo para Recepcionista y Medico',
  })
  @ApiResponse({
    status: 200,
    description: 'vista de usuarios exitosa ',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'MEDICO')
  findAll() {
    return this.patientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'trae a un paciente en especifico solo disponible para recepcionista y Medico',
  })
  @ApiResponse({
    status: 200,
    description: 'el paciente fue traido exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'MEDICO')
  findOne(@Param('id') id: string) {
    return this.patientsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary:
      'Actualiza a un paciente en especifico solo disponible para Recepcionista',
  })
  @ApiResponse({
    status: 200,
    description: 'paciente actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA')
  update(@Param('id') id: string, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(+id, updatePatientDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary:
      'elimina a un paciente en especifico solo disponible para Gerencia',
  })
  @ApiResponse({
    status: 200,
    description: 'el paciente fue eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('GERENCIA')
  remove(@Param('id') id: string) {
    return this.patientsService.remove(+id);
  }
}
