import { Test } from '@nestjs/testing';
import { TalksRepository } from '../talks.repository';
import { CreateTalkDto } from '../dto/create-talk.dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '../../auth/user.entity';
import { EntityManager } from 'typeorm';
const mockUser: User = new User();

describe('TalksRepository', () => {
  let talksRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TalksRepository, EntityManager],
    }).compile();
    talksRepository = await module.get<TalksRepository>(TalksRepository);
  });

  describe('createTalk', () => {
    it('success to save the talk', async () => {
      const createTalkDto: CreateTalkDto = {
        title: 'title',
        description: 'description',
      };
      jest.spyOn(talksRepository, 'save').mockImplementation(() => Promise.resolve());
      await expect(talksRepository.createTalk(createTalkDto, mockUser)).resolves.not.toThrow();
      expect(talksRepository.save).toHaveBeenCalledWith({
        ...createTalkDto,
        author: mockUser,
      });
    });
    it('failed to save the talk', async () => {
      const createTalkDto: CreateTalkDto = {
        title: 'title',
        description: 'description',
      };
      jest.spyOn(talksRepository, 'save').mockImplementation(() => Promise.reject({ stack: {} }));
      await expect(talksRepository.createTalk(createTalkDto, mockUser)).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('get', () => {
    it('gets all talks from the repository', async () => {
      const mockResult = [];
      const getMany = jest.fn().mockImplementation(() => Promise.resolve(mockResult));
      const orderBy = jest.fn().mockImplementation(() => {
        return { getMany };
      });
      jest.spyOn(talksRepository, 'createQueryBuilder').mockImplementation(() => {
        return { orderBy };
      });
      await expect(talksRepository.get()).resolves.not.toThrow();
      await expect(talksRepository.get()).resolves.toBe(mockResult);
      expect(talksRepository.createQueryBuilder).toBeCalledWith('talk');
      expect(orderBy).toBeCalledWith('talk.likedCount', 'DESC');
      expect(getMany).toBeCalled();
    });

    it('failed to get talks from repository', async () => {
      const getMany = jest.fn().mockImplementation(() => Promise.reject({ stack: {} }));
      const orderBy = jest.fn().mockImplementation(() => {
        return { getMany };
      });
      jest.spyOn(talksRepository, 'createQueryBuilder').mockImplementation(() => {
        return { orderBy };
      });
      await expect(talksRepository.get()).rejects.toThrow(InternalServerErrorException);
    });
  });

  describe('like', () => {
    it('success to like talks with current user', async () => {
      talksRepository.entityManager = {
        transaction: jest.fn,
      };
      jest.spyOn(talksRepository.entityManager, 'transaction').mockImplementation(() => {});
      const talkId = 1;
      await expect(talksRepository.like(talkId, mockUser)).resolves.not.toThrow();
      expect(talksRepository.entityManager.transaction).toHaveBeenCalledWith(expect.anything());
    });
  });
  describe('likeProcess', () => {
    it('success to like talks with current user', async () => {
      const add = jest.fn().mockImplementation(() => {
        return {};
      });
      const of = jest.fn().mockImplementation(() => {
        return { add };
      });
      const relation = jest.fn().mockImplementation(() => {
        return { of };
      });
      const execute = jest.fn().mockImplementation(() => Promise.resolve());
      const where = jest.fn().mockImplementation(() => {
        return { execute };
      });
      const set = jest.fn().mockImplementation(() => {
        return { where };
      });
      const update = jest.fn().mockImplementation(() => {
        return { set };
      });
      jest.spyOn(talksRepository, 'createQueryBuilder').mockImplementation(() => {
        return { relation, update };
      });
      const id = 1;
      await expect(talksRepository.likeProcess(id, mockUser)).resolves.not.toThrow();
      expect(talksRepository.createQueryBuilder).toHaveBeenCalledWith('talk');
      expect(relation).toHaveBeenCalledWith('likedUsers');
      expect(of).toHaveBeenCalledWith(id);
      expect(add).toHaveBeenCalledWith(mockUser);
      // TODO toHaveBeenCalledwith
      expect(set).toHaveBeenCalledWith(expect.anything());
      expect(where).toHaveBeenCalledWith('id = :id', { id });
    });

    it('failed to like talks with current user, when current user have already liked this talk', async () => {
      const add = jest.fn().mockImplementation(() => Promise.reject({ code: '23505' }));
      const of = jest.fn().mockImplementation(() => {
        return { add };
      });
      const relation = jest.fn().mockImplementation(() => {
        return { of };
      });
      jest.spyOn(talksRepository, 'createQueryBuilder').mockImplementation(() => {
        return { relation };
      });
      const talkId = 1;
      await expect(talksRepository.likeProcess(talkId, mockUser)).rejects.toThrow(BadRequestException);
    });

    it('failed to like talks with current user, when this talk not existed', async () => {
      const add = jest.fn().mockImplementation(() => Promise.reject({ code: '23503' }));
      const of = jest.fn().mockImplementation(() => {
        return { add };
      });
      const relation = jest.fn().mockImplementation(() => {
        return { of };
      });
      jest.spyOn(talksRepository, 'createQueryBuilder').mockImplementation(() => {
        return { relation };
      });
      const talkId = 1;
      await expect(talksRepository.likeProcess(talkId, mockUser)).rejects.toThrow(NotFoundException);
    });

    it('failed to like talks with current user, when as other error', async () => {
      const add = jest.fn().mockImplementation(() => Promise.reject({}));
      const of = jest.fn().mockImplementation(() => {
        return { add };
      });
      const relation = jest.fn().mockImplementation(() => {
        return { of };
      });
      jest.spyOn(talksRepository, 'createQueryBuilder').mockImplementation(() => {
        return { relation };
      });
      const talkId = 1;
      await expect(talksRepository.likeProcess(talkId, mockUser)).rejects.toThrow(InternalServerErrorException);
    });
  });
});
