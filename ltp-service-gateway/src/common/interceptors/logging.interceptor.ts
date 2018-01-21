import { Interceptor, ExecutionContext } from '@nestjs/common'
import { NestInterceptor } from '@nestjs/common/interfaces'
import { Observable } from 'rxjs/Observable'
import * as uuidv1 from 'uuid/v1'
import * as LogstashClient from 'logstash-client'
import config from '../../configs'
import 'rxjs/add/operator/do'

const logstashClient = new LogstashClient(config.logstash)
@Interceptor()
export class LoggingInterceptor implements NestInterceptor {
  intercept (dataOrRequest: any, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
    dataOrRequest.traceId = uuidv1()
    dataOrRequest.statusText = 'started'
    logstashClient.send(dataOrRequest.headers)
    const now = Date.now()
    return stream$.do((data) => {
      if (data) {
        logstashClient.send({ traceId: dataOrRequest.traceId, statusText: 'done', resDataText: JSON.stringify(data) })
      } else {
        logstashClient.send({ traceId: dataOrRequest.traceId, statusText: 'done' })
      }
    })
  }
}