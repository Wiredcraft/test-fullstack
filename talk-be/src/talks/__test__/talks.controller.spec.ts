import { Test, TestingModule } from '@nestjs/testing';
import { TalksController } from '../talks.controller';
import { TalksService } from '../talks.service';
import { CreateTalkDto } from '../dto/create-talk.dto';
import { TalksRepository } from '../talks.repository';
import { Talk } from '../talk.entity';
import { User } from '../../auth/user.entity';
import { EntityManager } from 'typeorm';

const mockUser: User = new User();

describe('Talks Controller', () => {
  let talkController: TalksController;
  let talksService: TalksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // imports: [
      //   AuthModule,
      // ],
      controllers: [TalksController],
      providers: [TalksService, TalksRepository, EntityManager],
    }).compile();

    talkController = module.get<TalksController>(TalksController);
    talksService = module.get<TalksService>(TalksService);
  });

  it('should be defined', () => {
    expect(talkController).toBeDefined();
  });

  describe('create', () => {
    it('should create a talk, and return the result', async () => {
      const createTalkDto: CreateTalkDto = {
        title: 'title',
        description: 'description2',
      };
      const talk = new Talk();
      jest.spyOn(talksService, 'create').mockImplementation(() => Promise.resolve(talk));
      await expect(talkController.create(createTalkDto, mockUser)).resolves.toStrictEqual({
        data: talk,
      });
      expect(talksService.create).toHaveBeenCalledWith(createTalkDto, mockUser);
    });
  });

  describe('get', () => {
    it('should return an array of talks', async () => {
      const t1 = new Talk();
      t1.title = 'title';
      t1.description = 'description';
      const t2 = new Talk();
      t2.title = 'title';
      t2.description = 'description';
      const mockReturn = [t1, t2];
      jest.spyOn(talksService, 'get').mockImplementation(() => Promise.resolve(mockReturn));
      await expect(talkController.get()).resolves.toStrictEqual({
        data: mockReturn,
      });
    });
  });

  describe('patch', () => {
    it('should like a talk', async () => {
      const talk = new Talk();
      jest.spyOn(talksService, 'like').mockImplementation(() => Promise.resolve(talk));
      await expect(talkController.patch(1, mockUser)).resolves.toStrictEqual({
        data: talk,
      });
      await expect(talkController.patch(1, mockUser)).resolves.not.toThrow();
      expect(talksService.like).toHaveBeenCalledWith(1, mockUser);
    });
  });
});
