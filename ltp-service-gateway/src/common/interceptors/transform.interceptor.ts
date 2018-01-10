import { Interceptor, ExecutionContext } from "@nestjs/common";
import { NestInterceptor } from "@nestjs/common/interfaces";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/map'


@Interceptor()
export class TransformInterceptor implements NestInterceptor {
  intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    return stream$.map(data => ({data}))
  }
}