import { Test, TestingModule } from '@nestjs/testing';
import { TalksService } from '../talks.service';
import { TalksRepository } from '../talks.repository';
import { CreateTalkDto } from '../dto/create-talk.dto';
import { Talk } from '../talk.entity';
import { User } from '../../auth/user.entity';
import { EntityManager } from 'typeorm';
const mockUser: User = new User();

describe('TalksService', () => {
  let talksService: TalksService;
  let talksRepository: TalksRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TalksService, TalksRepository, EntityManager],
    }).compile();

    talksService = module.get<TalksService>(TalksService);
    talksRepository = await module.get<TalksRepository>(TalksRepository);
  });

  it('should be defined', () => {
    expect(talksService).toBeDefined();
  });

  describe('create', () => {
    it('calls TalksRepository.create() and returns the result', async () => {
      jest.spyOn(talksRepository, 'createTalk').mockImplementation(() => Promise.resolve(new Talk()));
      expect(talksRepository.createTalk).not.toHaveBeenCalled();
      const createTalkDto: CreateTalkDto = { title: 'Test talk', description: 'Test desc' };
      const result = await talksService.create(createTalkDto, mockUser);
      expect(talksRepository.createTalk).toHaveBeenCalledWith(createTalkDto, mockUser);
      expect(result).toEqual({});
    });
  });

  describe('get', () => {
    it('gets all talks from the repository, ordered by rating ', async () => {
      const t1 = new Talk();
      t1.title = 'title';
      t1.description = 'description';
      const t2 = new Talk();
      t2.title = 'title';
      t2.description = 'description';
      const mockReturn = [t1, t2];
      jest.spyOn(talksRepository, 'get').mockImplementation(() => Promise.resolve(mockReturn));
      expect(talksRepository.get).not.toHaveBeenCalled();
      const result = await talksService.get();
      expect(talksRepository.get).toHaveBeenCalled();
      expect(result).toEqual(mockReturn);
    });
  });

  describe('like', () => {
    it('calls TalksRepository.like()', async () => {
      jest.spyOn(talksRepository, 'like').mockImplementation(() => Promise.resolve(new Talk()));
      expect(talksRepository.like).not.toHaveBeenCalled();
      const result = await talksService.like(1, mockUser);
      expect(talksRepository.like).toHaveBeenCalledWith(1, mockUser);
      expect(result).toEqual({});
    });
  });
});
