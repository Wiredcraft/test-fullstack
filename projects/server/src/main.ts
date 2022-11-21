import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "./error/all-exception.filter";
import { HttpExceptionFilter } from "./error/http-exception.filter";
import { TransformInterceptor } from "./transform/transform.interceptor";
import { ValidationPipe } from "@nestjs/common";
import * as session from "express-session";
import { LogInterceptor } from "./log/log.interceptor";
import { ReportLogger } from "./log/ReportLogger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: `${process.env.CLIENT_PROTOCOL}://${process.env.CLIENT_HOST}:${process.env.CLIENT_PORT}`,
      credentials: true,
    },
  });
  const reportLogger = new ReportLogger();

  app.setGlobalPrefix("api");

  app.use(
    session({
      secret: "lightning-talk",
      cookie: {
        expired: new Date("2299-12-30T00:00:00"),
      },
    })
  );

  // Catch Exception
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    })
  );

  // unified res
  app.useGlobalInterceptors(
    new LogInterceptor(reportLogger),
    new TransformInterceptor()
  );

  await app.listen(process.env.SERVER_PORT);
}

bootstrap();
