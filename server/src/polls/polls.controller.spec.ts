import { Test, TestingModule } from '@nestjs/testing';
import { PollsController } from './polls.controller';
import { PollsModule } from './polls.module';
import { DbModule } from '@libs/db';
import * as dotenv from 'dotenv';
import { PollDto } from './poll.dto';
import { UserDocument } from '@libs/db/models/user.model';
dotenv.config();

describe('Polls Controller', () => {
  let controller: PollsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PollsModule, DbModule],
      controllers: [PollsController],
      providers: []
    })
    .compile();

    controller = module.get<PollsController>(PollsController);
  });

  it('POST/ create a poll', async () => {
    const params = {
      title: '1',
      description: '11111'
    } as PollDto;
    const user = {} as UserDocument;
    const res = await controller.postPoll(params, user)
    expect(res).toMatchObject({})
  })
});
