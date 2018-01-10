import { Middleware, ExpressMiddleware } from "@nestjs/common";
import { NestMiddleware } from "@nestjs/common/interfaces";

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  resolve(name: string): ExpressMiddleware {
    return (req, res, next) => {
      console.log(`[${name}] Request...`)
      next()
    }
  }
  
}