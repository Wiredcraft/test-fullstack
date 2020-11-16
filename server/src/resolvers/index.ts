import {mergeResolvers} from '@graphql-tools/merge';

import talk from "./talk"
import user from "./user"

const resolvers = [talk, user];

export default mergeResolvers(resolvers);
