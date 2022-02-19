import { DateTime } from 'luxon';
import { ITalk } from '../../store/modules/talks/talks.types';

const talks: ITalk[] = [
  {
    id: '1',
    title: 'test title1',
    description:
      'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda. lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda. lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
    voteCount: 10,
    userName: 'testUser1',
    createdAt: DateTime.now()
  },
  {
    id: '2',
    title: 'test title2',
    description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
    voteCount: 20,

    userName: 'testUser2',
    createdAt: DateTime.now()
  },
  {
    id: '3',
    title: 'test title3',
    description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
    voteCount: 30,

    userName: 'testUser3',
    createdAt: DateTime.now()
  },
  {
    id: '4',
    title: 'test title4',
    description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
    voteCount: 40,

    userName: 'testUser4',
    createdAt: DateTime.now()
  },
  {
    id: '5',
    title: 'test title1',
    description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
    voteCount: 10,

    userName: 'testUser1',
    createdAt: DateTime.now()
  },
  {
    id: '6',
    title: 'test title2',
    description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
    voteCount: 20,

    userName: 'testUser2',
    createdAt: DateTime.now()
  },
  {
    id: '7',
    title: 'test title3',
    description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
    voteCount: 30,

    userName: 'testUser3',
    createdAt: DateTime.now()
  },
  {
    id: '8',
    title: 'test title4',
    description: 'lorem ipsum adowpadwoakdop kawdpkapokwaopdkapoda.',
    voteCount: 40,

    userName: 'testUser4',
    createdAt: DateTime.now()
  }
];

export { talks };
