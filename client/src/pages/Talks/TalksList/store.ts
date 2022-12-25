import { atom, selector } from 'recoil';

import { queryTalks } from '@/services/talks/queryTalks';
import { ClientError } from '@/utils/client-error';

//https://github.com/facebookexperimental/Recoil/issues/762#issuecomment-733943696

type QueryTalks = typeof queryTalks;
type QueryTalksParams = ServiceParams<QueryTalks>;
// type QueryTalksResponse = ServiceResponse<QueryTalks>;

export const talksFilterAtom = atom<QueryTalksParams>({
  key: 'talks.talks-list.filter',
  default: {
    // where: { my: false },
    take: 20,
    skip: 0,
    orderBy: { createdAt: 'desc' },
  },
});

export const talksQueryErrorAtom = atom<ClientError | null>({
  key: 'talks.talks-list.query.error',
  default: null,
});

export const talksQuerySelector = selector({
  key: 'talks.talks-list.query',
  get: ({ get }) => queryTalks(get(talksFilterAtom)).catch(() => null),
});

export const talksAtom = atom({
  key: 'talks.talks-list',
  default: talksQuerySelector,
});
