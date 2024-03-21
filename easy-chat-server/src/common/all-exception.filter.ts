import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiException, CODES } from 'src/common/exception';
import { ApiResponse } from 'src/common/response';
@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  logger = new Logger(AllExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof ApiException) {
      const exp = exception as ApiException;
      response.json(ApiResponse.Fail(exception.code, exp.message));
    } else if (exception instanceof BadRequestException) {
      const exp = exception as BadRequestException;
      const resp: string | object = exp.getResponse();
      response.json(ApiResponse.Fail(CODES.BADREQUEST, JSON.stringify(resp)));
    } else {
      response.json(
        ApiResponse.Fail(
          CODES.UNKNOWNERROR,
          exception.message || 'Unknown Error',
        ),
      );
    }
  }
}
