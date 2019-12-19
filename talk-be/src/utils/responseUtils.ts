import { ResponseDto } from '../dto/response.dto';
export default class ResponseUtils {
  static mapResponse<T>(data: T): ResponseDto<T> {
    return { data };
  }
}
