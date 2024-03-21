import { CODES } from './exception';

export class ApiResponse<T> {
  constructor(
    private code: number,
    private message: string,
    private success: boolean,
    private data?: T,
  ) {}

  static Success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(CODES.SUCCESS, 'success', true, data);
  }

  static Fail<T>(code: number, message: string): ApiResponse<T> {
    return new ApiResponse<T>(code, message, false, null);
  }
}
