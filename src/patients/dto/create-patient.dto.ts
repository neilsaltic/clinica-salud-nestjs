import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
export class CreatePatientDto {
  @ApiProperty({
    example: 'Juan',
    description: 'el nombre del paciente a ser creado',
  })
  @IsString({ message: 'el nombre debe de ser una cadena de texto ' })
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El nombre  no puede contener solo espacios',
  })
  name: string;
  @ApiProperty({
    example: 'Perez',
    description: 'el apellido del paciente a ser creado',
  })
  @IsString({ message: 'el apellido debe de ser una cadena de texto ' })
  @IsNotEmpty({ message: 'el apellido es obligatorio' })
  @MinLength(2, { message: 'El apellido debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El apellido  no puede contener solo espacios',
  })
  lastname: string;
  @ApiProperty({
    example: 'juanperez@gmail.com',
    description: 'el email del paciente a ser creado',
  })
  @IsEmail({}, { message: 'el email debe estar en el formato correcto' })
  @IsNotEmpty({ message: 'el email es obligatorio' })
  email: string;
  @ApiProperty({
    example: 'YYYY-MM-DD',
    description: 'la fecha de nacimiento del paciente a ser creado',
  })
  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria' })
  @IsDateString(
    {},
    { message: 'La fecha debe tener un formato válido (AAAA-MM-DD)' },
  )
  dateOfBirth: Date;
}
