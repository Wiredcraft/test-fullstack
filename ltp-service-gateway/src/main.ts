import { NestFactory } from '@nestjs/core'
import { ApplicationModule } from './app.module'
import { ValidationPipe } from './common/pipes/validation.pipe'

async function bootstrap () {
  const app = await NestFactory.create(ApplicationModule)
  // app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000)
}
bootstrap().then(() => {
  console.log('server is listening on port 3000')
})