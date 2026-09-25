import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { Role } from '../../generated/prisma/enums.js';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserDto {
  @ApiProperty({
    example: 'Juan Perez',
    description: 'el nombre del usuario a ser creado',
  })
  @IsString({ message: 'el nombre debe de ser una cadena de texto ' })
  @IsNotEmpty({ message: 'el nombre es obligatorio' })
  @MinLength(2, { message: 'El nombre debe tener almenos 2 caracteres' })
  @Matches(/\S/, {
    message: 'El nombre  no puede contener solo espacios',
  })
  name: string;
  @ApiProperty({
    example: 'juanperez@gmail.com',
    description: 'el email del usuario a ser creado',
  })
  @IsEmail({}, { message: 'el email debe estar en el formato correcto' })
  @IsNotEmpty({ message: 'el email es obligatorio' })
  email: string;
  @ApiProperty({
    example: '123456789',
    description: 'la contraseña del usuario a ser creado',
  })
  @IsString({ message: 'el password debe ser una cadena de texto' })
  @IsNotEmpty({ message: 'el password es obligatorio' })
  @MinLength(6, { message: 'el password debe tener almenos 6 caracteres' })
  @Matches(/\S/, {
    message: 'el password no puede contener solo espacios',
  })
  password: string;
}
