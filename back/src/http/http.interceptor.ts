import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable()
export class HttpInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // Manejamos respuestas exitosas
      map((data) => {
        return {
          statusCode: HttpStatus.OK, // Código HTTP 200
          success: true,
          message: 'Request successful',
          data, // Devuelve la información original
        };
      }),
      // Manejamos errores
      catchError((error) => {
        const status =
          error instanceof HttpException
            ? error.getStatus()
            : HttpStatus.INTERNAL_SERVER_ERROR;
        const message =
          error instanceof HttpException
            ? error.message
            : 'An unexpected error occurred';
        const response =
          error instanceof HttpException
            ? error.getResponse()
            : { error: error.message };

        return throwError(() => ({
          statusCode: status, // Código HTTP correcto
          success: false,
          message,
          error: response,
        }));
      }),
    );
  }
}
