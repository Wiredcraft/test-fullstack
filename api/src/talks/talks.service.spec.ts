import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Talk } from './entities/talk.entity';
import { Vote } from './entities/vote.entity';
import { TalksService } from './talks.service';

const title = 'Test talk';
const description = 'Lorem ipsummmm';

const user1 = new User({ name: 'Tester' });

const oneTalk = new Talk({
  id: 'randomid890',
  title,
  description,
  user: user1,
});

const talkArray = [
  new Talk({ id: 'randomid123', title: 'talk2', description: 'talk123123' }),
  new Talk({ id: 'randomid456', title: 'talk3', description: 'adsds' }),
  new Talk({ id: 'randomid789', title: 'talk4', description: 'dasda' }),
  new Talk({ id: 'randomid012', title: 'talk5', description: 'asddad' }),
];

const numberOfVotes = 10;

const newVote = new Vote({ user: user1, talk: oneTalk });

describe('TalksService', () => {
  let service: TalksService;
  let talkRepo: Repository<Talk>;
  let voteRepo: Repository<Vote>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TalksService,
        {
          provide: getRepositoryToken(Talk),
          useValue: {
            find: jest.fn().mockResolvedValue(talkArray),
            findOneOrFail: jest.fn().mockResolvedValue(oneTalk),
            create: jest.fn().mockReturnValue(oneTalk),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: getRepositoryToken(Vote),
          useValue: {
            count: jest.fn().mockResolvedValue(numberOfVotes),
            create: jest.fn().mockReturnValue(newVote),
            save: jest.fn(),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<TalksService>(TalksService);
    talkRepo = module.get<Repository<Talk>>(getRepositoryToken(Talk));
    voteRepo = module.get<Repository<Vote>>(getRepositoryToken(Vote));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create talk and vote successfully', async () => {
      const talkRes = await service.create(user1.id, { title, description });

      expect(talkRes).toEqual(oneTalk);

      expect(talkRepo.create).toBeCalledTimes(1);
      expect(talkRepo.save).toBeCalledTimes(1);
      expect(voteRepo.create).toBeCalledTimes(1);
      expect(voteRepo.save).toBeCalledTimes(1);
    });
  });

  describe('addOrDeleteVote', () => {
    it('should add vote if none exists', async () => {
      const spy = jest
        .spyOn(voteRepo, 'delete')
        .mockResolvedValueOnce({ affected: 0, raw: [] });

      const talkRes = await service.addOrDeleteVote(user1.id, oneTalk.id);

      expect(talkRes).toEqual(true);

      expect(spy).toBeCalled();
      expect(voteRepo.create).toBeCalledWith({
        user: new User({ id: user1.id }),
        talk: new Talk({ id: oneTalk.id }),
      });
      expect(voteRepo.save).toBeCalledTimes(1);
    });
  });
});
