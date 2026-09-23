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
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorators.js';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('users')
@ApiBearerAuth('JwT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiResponse({
  status: 401,
  description: 'no tienes permisos para acceder a ese recurso',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'crea un nuevo usuario' })
  @ApiResponse({
    status: 201,
    description: 'usuario creado exitosamente ',
  })
  @ApiResponse({
    status: 400,
    description: 'mal formato en el cuerpo de la solicitud',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({
    summary:
      'trae a todos los usuarios solo disponible para Recepcionista y Gerencia',
  })
  @ApiResponse({
    status: 200,
    description: 'vista de usuarios exitosa ',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'GERENCIA')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'trae a un usuario en especifico' })
  @ApiResponse({
    status: 200,
    description: 'el usuario fue traido exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('RECEPCIONISTA', 'GERENCIA')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'usuario actualizado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @ApiOperation({
    summary:
      'actualiza a un usuario en especifico disponible solo para Gerencia',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('GERENCIA')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'ELIMINA a un usuario solo disponible para Gerencia',
  })
  @ApiResponse({
    status: 200,
    description: 'usuario eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'no se encontro',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('GERENCIA')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
