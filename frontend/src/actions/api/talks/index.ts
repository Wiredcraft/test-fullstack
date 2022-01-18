import * as get from './get';
import * as list from './list';
import * as patch from './patch';
import * as post from './post';
import * as remove from './delete';

const talks = {
  ...remove,
  ...get,
  ...list,
  ...patch,
  ...post,
};

export default talks;
