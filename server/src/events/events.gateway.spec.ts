import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { EventsGateway } from './events.gateway';

describe('EventsGateway', () => {
  let app: INestApplication;
  let gateway: EventsGateway;
  const mockClient = {
    emit: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsGateway],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    gateway = app.get<EventsGateway>(EventsGateway);
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(async () => {
    jest.resetAllMocks();
  });

  it('server is defined', () => {
    expect(gateway.server).not.toBeNull();
  });
  
});
