import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';

export class CreateUserDto {
  @IsString({ message: 'el nombre debe de ser una cadena de texto ' })
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El nombre  no puede contener solo espacios',
  })
  name: string;
  @IsEmail({}, { message: 'el email debe estar en el formato correcto' })
  @IsNotEmpty({ message: 'el email es obligatorio' })
  email: string;
  @IsString({ message: 'el password debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el password es obligatorio' })
  @MinLength(6, { message: 'el password debe tener almenos 6 caracteres' })
  @Matches(/\S/, {
    message: 'el password no puede contener solo espacios',
  })
  password: string;
  @IsNotEmpty({ message: 'el rol es obligatorio' })
  @IsEnum(Role, {
    message: 'El rol solo puede ser: RECEPCIONISTA, MEDICO O GERENCIA',
  })
  role: Role;
  @IsString({ message: 'La Especialidad debe de ser una cadena de texto ' })
  @IsNotEmpty({ message: 'La Especialidad es obligatorio' })
  @MinLength(2, { message: 'La Especialidad debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'La Especialidad no puede contener solo espacios',
  })
  speciality?: string;
}
