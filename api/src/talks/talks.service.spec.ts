import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Talk } from './entities/talk.entity';
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

describe('TalksService', () => {
  let service: TalksService;
  let repo: Repository<Talk>;

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
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<TalksService>(TalksService);
    repo = module.get<Repository<Talk>>(getRepositoryToken(Talk));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create talk successfully', async () => {
      const talkRes = await service.create(user1.id, { title, description });

      expect(talkRes).toEqual(oneTalk);

      expect(repo.create).toBeCalledTimes(1);
      expect(repo.save).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return all talks successfully', async () => {
      const orderBy = { title: 'ASC' };

      const talkRes = await service.findAll(orderBy);

      expect(talkRes).toEqual(talkArray);

      expect(repo.find).toBeCalledTimes(1);
      expect(repo.find).toBeCalledWith({order: orderBy})
    });
  });
});
