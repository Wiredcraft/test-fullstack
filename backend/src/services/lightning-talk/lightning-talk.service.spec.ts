import { Test, TestingModule } from '@nestjs/testing';
import { LightningTalkService } from './lightning-talk.service';

describe('LightningTalkService', () => {
  let service: LightningTalkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LightningTalkService],
    }).compile();

    service = module.get<LightningTalkService>(LightningTalkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
