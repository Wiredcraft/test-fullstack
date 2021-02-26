import { Test, TestingModule } from '@nestjs/testing';
import { AuthtService } from './autht.service';

describe('AuthtService', () => {
  let service: AuthtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthtService],
    }).compile();

    service = module.get<AuthtService>(AuthtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
