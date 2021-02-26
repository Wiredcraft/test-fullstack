import { Test, TestingModule } from '@nestjs/testing';
import { Security } from './security';

describe('Security', () => {
  let provider: Security;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Security],
    }).compile();

    provider = module.get<Security>(Security);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
