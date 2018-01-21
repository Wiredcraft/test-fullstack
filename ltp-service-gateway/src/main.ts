import { NestFactory } from '@nestjs/core'
import * as cors from 'cors'
import { ApplicationModule } from './app.module'
import { ValidationPipe } from './common/pipes/validation.pipe'

async function bootstrap () {
  const app = await NestFactory.create(ApplicationModule)
  app.useGlobalPipes(new ValidationPipe())
  app.use(cors())
  await app.listen(4000)
}
bootstrap().then(() => {
  console.log('server is listening on port 4000')
})