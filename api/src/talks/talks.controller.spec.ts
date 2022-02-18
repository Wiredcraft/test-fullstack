import { Test, TestingModule } from '@nestjs/testing';
import { TalksController } from './talks.controller';
import { TalksService } from './talks.service';

describe('TalksController', () => {
  let controller: TalksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalksController],
      providers: [TalksService],
    }).compile();

    controller = module.get<TalksController>(TalksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
