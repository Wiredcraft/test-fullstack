const ResponseMessage = {
  200: 'success',
  400: 'bad request',
  404: 'not found',
  500: 'internal server error',

  default: 'unknown error',
};

export class BaseResponse {
  code: number;
  message: string;

  constructor(code: number, message?: string) {
    this.code = code;
    this.message =
      message || ResponseMessage[code] || ResponseMessage['default'];
  }
}

export class SimpleSuccessResponse extends BaseResponse {
  constructor() {
    super(200);
  }
}

export class SimpleErrorResponse extends BaseResponse {
  constructor(code: number) {
    super(code);
  }
}

export class DataResponse<T> extends BaseResponse {
  data: any;

  constructor(code: number, data: T, message?: string) {
    super(code, message);
    this.data = data;
  }
}

export class DataSuccessResponse<T> extends DataResponse<T> {
  constructor(data: T) {
    super(200, data);
  }
}
