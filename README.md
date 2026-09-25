## Flujo de Solicitud en NestJS: Pipeline Completo (`POST /citas`)

Cuando llega un request HTTP para crear una cita (`POST /citas`), NestJS procesa la petición a través del siguiente pipeline en orden secuencial:

1. **Guards (`JwtAuthGuard` / `RolesGuard`)**:
   - **`JwtAuthGuard`**: Verifica si la solicitud tiene una clave token en Authorize, y ademas si es que el token vencio, o si tiene uno no valido lanza el error de "acceso no autorizado o token no proporcionado".
   - **`RolesGuard`**: Verifica que la clave token tenga o incluya el Rol necesario para el endpoint al que se quiere acceder y si tiene permiso o el rol necesario entonces la solicitud avanza con normalidad pero sino manda error y mensaje de "no tienes el acceso para este recurso".

2. **Interceptor de Entrada (`LoggingInterceptor`)**:
   - captura el tiempo de llegada de la solicitud y empieza a cronometrar cuanto tiempo tarda el proceso de la solicitud.

3. **Pipes (`ValidationPipe`)**:
   - verifica que el cuerpo de la solicitud "(Body)" llegue en el formato adecuado de acuerdo al CreateAppointmentDTO.
   - Si la información es incorrecta manda error como error "400- Bad Request" o las validaciones que tiene por defecto en el CreateAppointmentDTO.

4. **Controlador y Servicio (`AppoitmentController` → `AppointmentService`)**:
   - Cuando la Validacion de createAppoitmentDTO sale de manera exitosa, pasa al controller a la funcion de create para pasar al AppointmentService.
   - Cuando ya se encuentra en el Appoitment Service este tiene aparte las validaciones para saber si el paciente existe o no y si el doctor existe o no ... y si en su rol es MEDICO llamando a la funcion findDoctor en userService.

5. **Filtros de Excepción (`PrismaExceptionFilter`)**:
   - Si ocurre una falla en la base de datos como ser que no exista una llave foranea que se quiera ingresar entonces tiene las respuestas o status para ese tipo de solicitudes como ser "404-Not Found" y "409-Conflict".

6. **Interceptor de Salida (`LoggingInterceptor`)**:
   - una vez que el proceso termina este para el cronometro de entrada y muestra cuanto tiempo tardo en ejecutarse la solicitud ya sea que la respuesta sea correcta o erronea .
