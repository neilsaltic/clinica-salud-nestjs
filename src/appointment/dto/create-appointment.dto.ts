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
  @IsNotEmpty({ message: 'La fecha y hora es obligatoria' })
  @IsDateString(
    {},
    { message: 'La fecha debe tener un formato válido (AAAA-MM-DD)' },
  )
  datetime: Date;
  @IsString({ message: 'La razon debe de ser una cadena de texto ' })
  @IsNotEmpty({ message: 'La razon es obligatoria' })
  @MinLength(2, { message: 'La razon debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'La razon  no puede contener solo espacios',
  })
  reason: string;
  @IsNotEmpty({ message: 'El ID del paciente es obligatorio' })
  @IsInt({ message: 'El ID del paciente debe ser un número entero' })
  @IsPositive({ message: 'El ID del paciente debe ser mayor a 0' })
  patientId: number;
  @IsNotEmpty({ message: 'El ID del medico es obligatorio' })
  @IsInt({ message: 'El ID del medico debe ser un número entero' })
  @IsPositive({ message: 'El ID del medico debe ser mayor a 0' })
  doctorId: number;
}
