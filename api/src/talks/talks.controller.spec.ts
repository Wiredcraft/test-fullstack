import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../users/entities/user.entity';
import { Talk } from './entities/talk.entity';
import { TalksController } from './talks.controller';
import { TalksService } from './talks.service';

const user = new User({ id: 'abc123', name: 'testerino' });

const title = 'testtitle';
const description = 'you know';
const id = 'doiawjd';

const oneTalk = new Talk({ id, title, description, user });

const talks = {
  items: [
    {
      id,
      title,
      description,
    },
    {
      id: 'asd3wqdqw',
      title: 'dawoijdaowi',
      description: 'dawojkdaw',
    },
    {
      id: 'dqwdqwd',
      title: 'dawiojdwaio',
      description: 'dwaijod',
    },
  ],
  meta: {
    itemCount: 3,
    totalItems: 3,
    itemsPerPage: 20,
    totalPages: 1,
    currentPage: 1,
  },
};

describe('TalksController', () => {
  let controller: TalksController;
  let service: TalksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TalksController],
      providers: [
        {
          provide: TalksService,
          useValue: {
            create: jest.fn().mockResolvedValue(oneTalk),
            findAll: jest.fn().mockResolvedValue(talks),
            addOrDeleteVote: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    controller = module.get<TalksController>(TalksController);
    service = module.get<TalksService>(TalksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('calls function successfully', async () => {
      const res = await controller.create(
        { user: { id: user.id, name: user.name } } as any,
        { title, description },
      );

      expect(res).toEqual(oneTalk);
      expect(service.create).toHaveBeenCalledWith(user.id, {
        title,
        description,
      });
    });
  });

  describe('index', () => {
    it('calls the findAll function and returns it successfully', async () => {
      const res = await controller.index();

      expect(res).toEqual(talks);
      expect(service.findAll).toHaveBeenCalledWith(
        { page: 1, limit: 20 },
        'popular',
      );
    });
  });

  describe('vote', () => {
    it('calls the vote function adn returns it successfully', async () => {
      const res = await controller.vote(oneTalk.id, {
        user: { id: user.id, name: user.name },
      } as any);

      expect(res).toEqual(true);

      expect(service.addOrDeleteVote).toHaveBeenCalledWith(user.id, oneTalk.id);
    });
  });
});
