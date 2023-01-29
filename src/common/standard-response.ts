import { HttpStatus } from '@nestjs/common';

export class StandardResponse<T> {
  public status: HttpStatus;
  public message: string;
  public data?: T;

  constructor(status: HttpStatus, message: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
