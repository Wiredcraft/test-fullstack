import { fetchTalks } from '@/request';
import { LIMIT } from '@/helpers';

export default {
  state: {
    talks: [],
    hasMore: true,
  },
  reducers: {
    setTalks(state, payload) {
      return { ...state, talks: payload };
    },
    setHasMore(state, payload) {
      return { ...state, hasMore: payload };
    },
  },
  effects: (dispatch) => ({
    async fetchTalks(query = { limit: LIMIT, start: 0 }, state) {
      const data = await fetchTalks(query);
      if (query.start === 0) {
        dispatch.talks.setTalks(data);
      } else {
        dispatch.talks.setTalks([...state.talks.talks, ...data]);
      }
      if (data.length === 0) {
        dispatch.talks.setHasMore(false);
      }
    },
  }),
};
