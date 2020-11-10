import { Test, TestingModule } from '@nestjs/testing';
import { LightningTalkController } from './lightning-talk.controller';

describe('LightningTalkController', () => {
  let controller: LightningTalkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LightningTalkController],
    }).compile();

    controller = module.get<LightningTalkController>(LightningTalkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
