import { Role } from '../../generated/prisma/enums.js';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: Role;
  speciality?: string;
}
