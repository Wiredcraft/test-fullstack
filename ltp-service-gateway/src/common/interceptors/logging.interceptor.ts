import { Interceptor, ExecutionContext } from "@nestjs/common";
import { NestInterceptor } from "@nestjs/common/interfaces";
import { Observable } from "rxjs/Observable";

import 'rxjs/add/operator/do';

@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  intercept(dataOrRequest: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    console.log('Before ...')
    const now = Date.now()
    return stream$.do(() => {
      console.log(`After ... ${Date.now() - now} ms`)
    })
  }
  
}