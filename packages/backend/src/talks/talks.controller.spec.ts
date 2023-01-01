import { Test, TestingModule } from '@nestjs/testing';
import { TalksController } from './talks.controller';

describe('TalksController', () => {
  let controller: TalksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalksController],
    }).compile();

    controller = module.get<TalksController>(TalksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
