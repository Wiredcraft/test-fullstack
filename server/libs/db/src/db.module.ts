import { Module, Global } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { DbService } from './db.service';
import { Poll } from './models/poll.model';
import { User } from './models/user.model';

const models = TypegooseModule.forFeature([
  Poll,
  User
]);

@Global()
@Module({
  imports: [
    TypegooseModule.forRoot('mongodb://localhost/testFullStack', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    }),
    models,
  ],
  providers: [DbService],
  exports: [DbService, models],
})
export class DbModule {}
