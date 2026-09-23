import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty({
    example: 'YYYY-MM-DD HH:MM',
    description: 'la fecha y la hora de la cita ',
  })
  @IsNotEmpty({ message: 'La fecha y hora es obligatoria' })
  @IsDateString(
    {},
    { message: 'La fecha debe tener un formato válido (AAAA-MM-DD)' },
  )
  datetime: Date;
  @ApiProperty({
    example: 'dolor de cabeza',
    description: 'razon de la cita',
  })
  @IsString({ message: 'La razon debe de ser una cadena de texto ' })
  @IsNotEmpty({ message: 'La razon es obligatoria' })
  @MinLength(2, { message: 'La razon debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'La razon  no puede contener solo espacios',
  })
  reason: string;
  @ApiProperty({
    example: '1',
    description: 'el id de paciente para cita',
  })
  @IsNotEmpty({ message: 'El ID del paciente es obligatorio' })
  @IsInt({ message: 'El ID del paciente debe ser un número entero' })
  @IsPositive({ message: 'El ID del paciente debe ser mayor a 0' })
  patientId: number;
  @ApiProperty({
    example: '1',
    description: 'Id del doctor que atendera la cita',
  })
  @IsNotEmpty({ message: 'El ID del medico es obligatorio' })
  @IsInt({ message: 'El ID del medico debe ser un número entero' })
  @IsPositive({ message: 'El ID del medico debe ser mayor a 0' })
  doctorId: number;
}
