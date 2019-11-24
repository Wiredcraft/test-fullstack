import axios from 'axios';
import moment from 'moment'
import {API_BASEURL} from '@constants'

let posts = {
    state: {
      data: [],
    },
    reducers: {
      setData(state, data) {
        return {
          ...state,
          data: data
        };
      }
    },
    effects: {
      async getData() {
        const list = await axios.get(`${API_BASEURL}/talks`);
        this.setData(list.data);
      },
      async filterDataByNewest(payload, state) {
        const { posts } = state;
        const filterData = [...posts.data].sort((a, b) => moment(a.createdAt) - moment(b.createdAt));
        this.setData(filterData);
      },
      async filterDataByPast(payload, state) {
        const { posts } = state;
        const filterData = [...posts.data].sort((a, b) => moment(b.createdAt) - moment(a.createdAt));
        this.setData(filterData);
      },
    }
  };
   
  export default posts;
  