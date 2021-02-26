import { Test, TestingModule } from '@nestjs/testing';
import { Swagger } from './swagger';

describe('Swagger', () => {
  let provider: Swagger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Swagger],
    }).compile();

    provider = module.get<Swagger>(Swagger);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
